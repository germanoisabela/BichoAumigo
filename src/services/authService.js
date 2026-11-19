import { ACCOUNT_TYPES, OWNER_TYPES } from '../constants/accountTypes';
import { normalizeBrazilPhone } from '../utils/phone';
import { findOwner } from './ownersService';
import { respond } from './mockApi';

// ATENÇÃO: este serviço é DEMONSTRATIVO. Ele não verifica senha nem guarda nada num servidor.
// Será substituído pelo login real (e-mail/senha e Google) quando o grupo escolher o backend.

// Entra numa conta de demonstração (uma pessoa ou uma ONG de exemplo).
export function signInDemo(accountType) {
  const ownerId = accountType === ACCOUNT_TYPES.ENTITY ? 'ong-colheita-de-amor' : 'roberto-alves';
  return respond(findOwner(ownerId));
}

// Cria uma conta de demonstração com os dados do formulário de cadastro.
// `values` = { accountType, name, mobile }
export function registerDemoUser({ accountType, name, mobile }) {
  const isOrganization = accountType === ACCOUNT_TYPES.ENTITY;

  return respond({
    id: `demo-${Date.now()}`,
    type: isOrganization ? OWNER_TYPES.ORGANIZATION : OWNER_TYPES.USER,
    name,
    description: isOrganization ? 'Organização de proteção animal' : 'Pessoa da comunidade BichoAumigo',
    location: 'Localização não informada',
    image: isOrganization
      ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85'
      : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    about:
      'Este perfil foi criado nesta demonstração. Complete as informações para apresentar sua história e os animais sob seus cuidados.',
    whatsappNumber: normalizeBrazilPhone(mobile),
  });
}
