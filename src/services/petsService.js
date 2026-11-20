import { supabase } from '../supabase';
import { normalizeBrazilPhone } from '../utils/phone';

const PET_STATUSES = {
  DISPONIVEL: 'Disponível',
  EM_RECUPERACAO: 'Em recuperação',
  ADOTADO: 'Indisponível',
};

const PET_SIZES = {
  PEQUENO: 'Pequeno',
  MEDIO: 'Médio',
  GRANDE: 'Grande',
};

function formatApproximateAge(value) {
  if (!value) return null;

  const birthDate = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  const today = new Date();
  if (Number.isNaN(birthDate.getTime()) || birthDate > today) return null;

  let months =
    (today.getFullYear() - birthDate.getFullYear()) * 12 +
    today.getMonth() -
    birthDate.getMonth();
  if (today.getDate() < birthDate.getDate()) months -= 1;
  if (months < 1) return 'Menos de 1 mês';
  if (months < 12) {
    return `Aproximadamente ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }

  const years = Math.floor(months / 12);
  return `Aproximadamente ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

function mapOwner(row) {
  const isOrganization = row.responsavel_tipo_conta === 'JURIDICA';

  return {
    id: row.id_usuario,
    type: isOrganization ? 'organization' : 'user',
    name: row.responsavel_nome,
    description: row.responsavel_descricao,
    location: row.responsavel_localizacao,
    image: row.responsavel_imagem || null,
    about: row.responsavel_biografia || '',
    whatsappNumber: normalizeBrazilPhone(row.responsavel_telefone),
  };
}

export function mapPetRow(row) {
  const gallery = Array.isArray(row.galeria) ? row.galeria.filter(Boolean) : [];

  return {
    id: row.id_pet,
    ownerId: row.id_usuario,
    name: row.nome,
    type: row.nome_especie,
    status: PET_STATUSES[row.status_pet] ?? row.status_pet,
    image: row.imagem || gallery[0] || null,
    gallery,
    age: formatApproximateAge(row.data_nascimento_aproximada),
    breed: row.nome_raca || 'Sem raça definida',
    size: PET_SIZES[row.porte] ?? row.porte,
    sex: row.sexo === 'FEMEA' ? 'Fêmea' : 'Macho',
    description: row.descricao || '',
    owner: mapOwner(row),
  };
}

export async function listPets() {
  const { data, error } = await supabase
    .from('pets_publicos')
    .select('*')
    .order('data_cadastro', { ascending: false });

  if (error) throw error;
  return data.map(mapPetRow);
}

export async function listPetsByOwner(ownerId) {
  const numericOwnerId = Number(ownerId);
  if (!Number.isSafeInteger(numericOwnerId) || numericOwnerId <= 0) {
    throw new Error(
      'O perfil de demonstração ainda não está vinculado a um usuário do Supabase.',
    );
  }

  const { data, error } = await supabase
    .from('pets_publicos')
    .select('*')
    .eq('id_usuario', numericOwnerId)
    .order('data_cadastro', { ascending: false });

  if (error) throw error;
  return data.map(mapPetRow);
}

export async function getPetDetails(id) {
  const petId = Number(id);
  if (!Number.isSafeInteger(petId) || petId <= 0) return null;

  const { data, error } = await supabase
    .from('pets_publicos')
    .select('*')
    .eq('id_pet', petId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPetRow(data) : null;
}
