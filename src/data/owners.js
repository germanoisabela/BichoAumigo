// Responsáveis de exemplo (pessoas e ONGs). Dados fictícios.

export const owners = {
  roberto: {
    id: 'roberto-alves',
    type: 'user',
    name: 'Roberto Alves',
    description: 'Protetor independente',
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    about: 'Ajudo animais encontrados em situação de vulnerabilidade a receber cuidados e encontrar uma família preparada. Cada pet anunciado fica comigo temporariamente até encontrar um lar responsável.',
    whatsappNumber: '',
  },
  colheita: {
    id: 'ong-colheita-de-amor',
    type: 'organization',
    name: 'ONG Colheita de Amor',
    description: 'Organização de proteção animal',
    location: 'Piedade, SP',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85',
    about: 'Somos uma organização dedicada ao acolhimento, cuidado veterinário e encaminhamento responsável de animais resgatados. Acompanhamos cada adoção para apoiar a adaptação do pet à nova família.',
    whatsappNumber: '',
  },
  patasAmigas: {
    id: 'ong-patas-amigas',
    type: 'organization',
    name: 'ONG Patas Amigas',
    description: 'Organização de proteção animal',
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85',
    about: 'A ONG Patas Amigas trabalha pelo bem-estar dos animais, conectando pets resgatados a pessoas interessadas em oferecer um lar seguro e afetuoso.',
    whatsappNumber: '',
  },
};

// Animais sem responsável cadastrado aparecem como sendo desta ONG.
export const DEFAULT_OWNER_ID = 'ong-patas-amigas';
