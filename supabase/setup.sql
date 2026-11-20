-- Execute no SQL Editor do Supabase. CREATE IF NOT EXISTS permite completar
-- uma instalação parcial sem apagar as tabelas ou os dados que já existem.

CREATE TABLE IF NOT EXISTS public.usuarios (
  id_usuario BIGSERIAL PRIMARY KEY,
  tipo_conta VARCHAR(20) NOT NULL CHECK (tipo_conta IN ('INDIVIDUAL', 'JURIDICA')),
  perfil_acesso VARCHAR(20) NOT NULL CHECK (perfil_acesso IN ('USUARIO', 'ADMIN')),
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255),
  telefone VARCHAR(20),
  documento VARCHAR(20) NOT NULL UNIQUE,
  biografia TEXT,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.usuarios_pf (
  id_usuario BIGINT PRIMARY KEY REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  genero VARCHAR(20),
  data_nascimento DATE
);

CREATE TABLE IF NOT EXISTS public.usuarios_pj (
  id_usuario BIGINT PRIMARY KEY REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
  razao_social VARCHAR(150) NOT NULL,
  nome_fantasia VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS public.fotos_usuario (
  id_foto BIGSERIAL PRIMARY KEY,
  id_usuario BIGINT NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
  url_foto VARCHAR(255) NOT NULL,
  foto_principal BOOLEAN NOT NULL DEFAULT FALSE,
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fotos_usuario_usuario
  ON public.fotos_usuario(id_usuario);

CREATE TABLE IF NOT EXISTS public.enderecos (
  id_endereco BIGSERIAL PRIMARY KEY,
  cep CHAR(8) NOT NULL,
  logradouro VARCHAR(150) NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.usuario_enderecos (
  id_usuario BIGINT NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
  id_endereco BIGINT NOT NULL REFERENCES public.enderecos(id_endereco) ON DELETE CASCADE,
  numero VARCHAR(20),
  complemento VARCHAR(100),
  e_principal BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id_usuario, id_endereco)
);

CREATE INDEX IF NOT EXISTS idx_ue_endereco
  ON public.usuario_enderecos(id_endereco);

CREATE TABLE IF NOT EXISTS public.especies (
  id_especie SERIAL PRIMARY KEY,
  nome_especie VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.racas (
  id_raca SERIAL PRIMARY KEY,
  id_especie INT NOT NULL REFERENCES public.especies(id_especie) ON DELETE RESTRICT,
  nome_raca VARCHAR(100) NOT NULL,
  CONSTRAINT uq_raca_especie UNIQUE (id_especie, nome_raca)
);

CREATE INDEX IF NOT EXISTS idx_racas_especie
  ON public.racas(id_especie);

CREATE TABLE IF NOT EXISTS public.pets (
  id_pet BIGSERIAL PRIMARY KEY,
  id_usuario BIGINT NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
  id_especie INT NOT NULL REFERENCES public.especies(id_especie) ON DELETE RESTRICT,
  id_raca INT REFERENCES public.racas(id_raca) ON DELETE SET NULL,
  nome VARCHAR(100) NOT NULL,
  sexo VARCHAR(10) NOT NULL CHECK (sexo IN ('MACHO', 'FEMEA')),
  data_nascimento_aproximada DATE,
  porte VARCHAR(10) NOT NULL CHECK (porte IN ('PEQUENO', 'MEDIO', 'GRANDE')),
  descricao TEXT,
  status_pet VARCHAR(20) NOT NULL CHECK (status_pet IN ('DISPONIVEL', 'EM_RECUPERACAO', 'ADOTADO')),
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pets_usuario
  ON public.pets(id_usuario);
CREATE INDEX IF NOT EXISTS idx_pets_especie
  ON public.pets(id_especie);
CREATE INDEX IF NOT EXISTS idx_pets_raca
  ON public.pets(id_raca);

CREATE TABLE IF NOT EXISTS public.fotos_pet (
  id_foto BIGSERIAL PRIMARY KEY,
  id_pet BIGINT NOT NULL REFERENCES public.pets(id_pet) ON DELETE CASCADE,
  url_foto VARCHAR(255) NOT NULL,
  foto_principal BOOLEAN NOT NULL DEFAULT FALSE,
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fotos_pet_pet
  ON public.fotos_pet(id_pet);

CREATE TABLE IF NOT EXISTS public.favoritos (
  id_usuario BIGINT NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
  id_pet BIGINT NOT NULL REFERENCES public.pets(id_pet) ON DELETE CASCADE,
  data_favoritado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_pet)
);

CREATE TABLE IF NOT EXISTS public.registros_contato (
  id_registro BIGSERIAL PRIMARY KEY,
  id_pet BIGINT NOT NULL REFERENCES public.pets(id_pet) ON DELETE CASCADE,
  id_usuario_interessado BIGINT REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
  canal_contato VARCHAR(20) NOT NULL CHECK (canal_contato IN ('WHATSAPP', 'TELEFONE', 'EMAIL')),
  data_contato TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_registros_contato_pet
  ON public.registros_contato(id_pet);
CREATE INDEX IF NOT EXISTS idx_registros_contato_usuario
  ON public.registros_contato(id_usuario_interessado);

-- A senha deve ser gerenciada pelo Supabase Auth, não por esta tabela.
ALTER TABLE public.usuarios ALTER COLUMN senha DROP NOT NULL;
COMMENT ON COLUMN public.usuarios.senha IS
  'Não usar para autenticação. Senhas são gerenciadas pelo Supabase Auth.';

-- Liga o usuário do app ao UUID do Supabase Auth para as políticas de proprietário.
ALTER TABLE public.usuarios
  ADD COLUMN IF NOT EXISTS auth_user_id UUID;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'usuarios_auth_user_id_fkey'
      AND conrelid = 'public.usuarios'::regclass
  ) THEN
    ALTER TABLE public.usuarios
      ADD CONSTRAINT usuarios_auth_user_id_fkey
      FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_auth_user_id
  ON public.usuarios(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

-- Perfil público dos anúncios. Não retorna e-mail, documento, senha,
-- logradouro, número, complemento nem CEP.
CREATE OR REPLACE VIEW public.pets_publicos
WITH (security_invoker = false)
AS
SELECT
  p.id_pet,
  p.id_usuario,
  p.nome,
  p.sexo,
  p.data_nascimento_aproximada,
  p.porte,
  p.descricao,
  p.status_pet,
  p.data_cadastro,
  e.nome_especie,
  r.nome_raca,
  (
    SELECT fp.url_foto
    FROM public.fotos_pet fp
    WHERE fp.id_pet = p.id_pet
    ORDER BY fp.foto_principal DESC, fp.data_cadastro, fp.id_foto
    LIMIT 1
  ) AS imagem,
  COALESCE(
    (
      SELECT array_agg(fp.url_foto ORDER BY fp.foto_principal DESC, fp.data_cadastro, fp.id_foto)
      FROM public.fotos_pet fp
      WHERE fp.id_pet = p.id_pet
    ),
    ARRAY[]::VARCHAR[]
  ) AS galeria,
  u.tipo_conta AS responsavel_tipo_conta,
  CASE
    WHEN u.tipo_conta = 'JURIDICA' THEN
      COALESCE(NULLIF(BTRIM(upj.nome_fantasia), ''), NULLIF(BTRIM(upj.razao_social), ''), 'Instituição')
    ELSE
      COALESCE(NULLIF(BTRIM(CONCAT_WS(' ', upf.nome, upf.sobrenome)), ''), 'Responsável')
  END AS responsavel_nome,
  CASE
    WHEN u.tipo_conta = 'JURIDICA' THEN 'Organização de proteção animal'
    ELSE 'Protetor independente'
  END AS responsavel_descricao,
  u.biografia AS responsavel_biografia,
  u.telefone AS responsavel_telefone,
  foto_usuario.url_foto AS responsavel_imagem,
  COALESCE(
    NULLIF(
      CONCAT_WS(
        ' · ',
        NULLIF(BTRIM(endereco.bairro), ''),
        NULLIF(
          CONCAT_WS(', ', NULLIF(BTRIM(endereco.cidade), ''), NULLIF(BTRIM(endereco.estado), '')),
          ''
        )
      ),
      ''
    ),
    'Localização não informada'
  ) AS responsavel_localizacao
FROM public.pets p
JOIN public.especies e ON e.id_especie = p.id_especie
JOIN public.usuarios u ON u.id_usuario = p.id_usuario
LEFT JOIN public.racas r ON r.id_raca = p.id_raca
LEFT JOIN public.usuarios_pf upf ON upf.id_usuario = u.id_usuario
LEFT JOIN public.usuarios_pj upj ON upj.id_usuario = u.id_usuario
LEFT JOIN LATERAL (
  SELECT fu.url_foto
  FROM public.fotos_usuario fu
  WHERE fu.id_usuario = u.id_usuario
  ORDER BY fu.foto_principal DESC, fu.data_cadastro, fu.id_foto
  LIMIT 1
) foto_usuario ON TRUE
LEFT JOIN LATERAL (
  SELECT en.bairro, en.cidade, en.estado
  FROM public.usuario_enderecos ue
  JOIN public.enderecos en ON en.id_endereco = ue.id_endereco
  WHERE ue.id_usuario = u.id_usuario
  ORDER BY ue.e_principal DESC, ue.id_endereco
  LIMIT 1
) endereco ON TRUE;

CREATE OR REPLACE FUNCTION public.usuario_e_dono(p_id_usuario BIGINT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.usuarios u
    WHERE u.id_usuario = p_id_usuario
      AND u.auth_user_id = (SELECT auth.uid())
  );
$$;

REVOKE ALL ON FUNCTION public.usuario_e_dono(BIGINT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.usuario_e_dono(BIGINT) TO authenticated;

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios_pf ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios_pj ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fotos_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enderecos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuario_enderecos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.especies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.racas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fotos_pet ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros_contato ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated;

REVOKE ALL ON TABLE
  public.usuarios,
  public.usuarios_pf,
  public.usuarios_pj,
  public.fotos_usuario,
  public.enderecos,
  public.usuario_enderecos,
  public.especies,
  public.racas,
  public.pets,
  public.fotos_pet,
  public.favoritos,
  public.registros_contato
FROM anon, authenticated;

REVOKE ALL ON public.pets_publicos FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.pets_publicos TO anon, authenticated;

GRANT SELECT ON public.pets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pets TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.pets_id_pet_seq TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.fotos_pet TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.fotos_pet_id_foto_seq TO authenticated;

DROP POLICY IF EXISTS pets_public_read ON public.pets;
CREATE POLICY pets_public_read
  ON public.pets
  FOR SELECT
  TO anon, authenticated
  USING (TRUE);

DROP POLICY IF EXISTS pets_owner_manage ON public.pets;
CREATE POLICY pets_owner_manage
  ON public.pets
  FOR ALL
  TO authenticated
  USING (public.usuario_e_dono(id_usuario))
  WITH CHECK (public.usuario_e_dono(id_usuario));

DROP POLICY IF EXISTS fotos_pet_owner_manage ON public.fotos_pet;
CREATE POLICY fotos_pet_owner_manage
  ON public.fotos_pet
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.pets p
      WHERE p.id_pet = fotos_pet.id_pet
        AND public.usuario_e_dono(p.id_usuario)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.pets p
      WHERE p.id_pet = fotos_pet.id_pet
        AND public.usuario_e_dono(p.id_usuario)
    )
  );
