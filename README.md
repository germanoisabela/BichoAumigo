# BichoAUmigo 🐾

Site de **divulgação e adoção responsável de animais**. A ideia é reunir num só lugar os animais
resgatados que hoje ficam espalhados em grupos de WhatsApp e redes sociais, e aproximá-los de
pessoas que querem adotar.

> Não é um e-commerce: não há venda de produtos nem de animais. O foco são pessoas físicas, e a
> adoção é combinada diretamente entre as pessoas envolvidas.

## Situação atual

O projeto é um **protótipo de front-end**: as telas funcionam, mas os dados (animais, responsáveis
e login) são **de exemplo** e ficam dentro do código. Ainda não há banco de dados nem login real.
Essa parte entra em etapas futuras.

## Tecnologias

- [React](https://react.dev) 19 + [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) (rotas/páginas)
- ESLint e Prettier (qualidade e formatação do código)

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre o site em modo de desenvolvimento (endereço mostrado no terminal)
```

Outros comandos:

| Comando                | O que faz                                          |
| ---------------------- | -------------------------------------------------- |
| `npm run build`        | gera a versão final do site (pasta `dist/`)        |
| `npm run preview`      | abre a versão final localmente, para testar        |
| `npm run lint`         | procura erros e más práticas no código             |
| `npm run format`       | formata todo o código com o Prettier               |
| `npm run format:check` | só confere se o código está formatado              |

## Estrutura de pastas

```
src/
├── main.jsx          Ponto de entrada: liga o roteador, o login e os estilos globais
├── App.jsx           Mapa de rotas (endereço → página)
├── pages/            Uma página por rota (Home, Login, Register, PetDetails...)
├── components/       Peças reutilizáveis (Header, PetCard, PetGrid, Loading...)
├── services/         Acesso aos dados. HOJE devolvem dados de exemplo; quando o banco
│                     estiver pronto, só o conteúdo destes arquivos muda
├── context/          Dados compartilhados por todo o site (quem está logado)
├── hooks/            Funções reutilizáveis do React (useAuth, useAsyncData, useGoBack)
├── utils/            Funções simples e sem tela (telefone, regras de senha)
├── constants/        Listas e valores fixos (categorias, status, tipos de conta)
├── data/             Dados de exemplo (serão aposentados quando houver banco)
└── styles/           Estilos globais (variáveis de cor, base, partes compartilhadas)
```

Cada componente ou página tem seu CSS ao lado (ex.: `components/Header.jsx` + `Header.css`).
As cores e fontes ficam em `src/styles/variables.css`.

### Rotas

| Endereço             | Página                      | Exige login |
| -------------------- | --------------------------- | ----------- |
| `/entrar`            | Login                       | não         |
| `/cadastro`          | Criar conta                 | não         |
| `/`                  | Home (busca de animais)     | sim         |
| `/animais/:id`       | Perfil de um animal         | sim         |
| `/responsavel/:id`   | Perfil de pessoa ou ONG     | sim         |
| `/cadastrar-animal`  | Cadastrar animal (em obras) | sim         |
| `/favoritos`         | Favoritos (em obras)        | sim         |
| `/perfil`            | Meu perfil                  | sim         |
| qualquer outro       | Página não encontrada (404) | não         |

## Como trabalhamos em grupo (Git)

1. **Nunca trabalhar direto na `main`.** Ela deve ter sempre uma versão que funciona.
2. Antes de começar: `git pull` para pegar o que os colegas fizeram.
3. Uma **branch por tarefa**, com nome curto: `feature/cadastro-de-animal`, `fix/botao-voltar`,
   `docs/readme`.
4. **Commits pequenos**, com mensagem no formato `tipo: o que foi feito`:
   - `feat:` funcionalidade nova → `feat: cria formulário de cadastro de animal`
   - `fix:` correção de erro → `fix: corrige link do WhatsApp sem número`
   - `refactor:` reorganização sem mudar o comportamento
   - `style:` só formatação · `docs:` documentação · `chore:` configuração e ferramentas
5. Abrir um **Pull Request** para a `main` e pedir que **outra pessoa revise** antes de juntar.
6. Antes de abrir o Pull Request, rodar `npm run lint` e `npm run build` e garantir que não há erros.

## Regras do projeto

- **Segredos fora do Git:** senhas, chaves e o arquivo `.env` nunca vão para o GitHub
  (use o `.env.example` como modelo).
- **Privacidade:** pedir só os dados realmente necessários e mostrar apenas o **bairro**, nunca
  endereço exato.
- **Cadastro de animais** deve aceitar informações desconhecidas (animais encontrados na rua).
- **Não exibir publicamente** quem adotou um animal.
