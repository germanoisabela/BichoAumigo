const dogPhotos = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7a5d?auto=format&fit=crop&w=900&q=85',
];

const catPhotos = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=85',
];

const birdPhotos = [
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&w=900&q=85',
];

const owners = {
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

const profiles = {
  1: { age: '3 anos', breed: 'Golden retriever', size: 'Grande', health: 'Vacinado e vermifugado', temperament: 'Carinhoso, brincalhão e sociável', care: 'Gosta de passeios e precisa de espaço para brincar.', gallery: dogPhotos },
  2: { age: '2 anos', breed: 'Sem raça definida', size: 'Médio', health: 'Saudável, vacinado e vermifugado', temperament: 'Dócil, companheiro e curioso', care: 'Precisa de passeios diários e adaptação gradual.', gallery: dogPhotos },
  3: { age: '1 ano', breed: 'Sem raça definida', size: 'Pequeno', health: 'Vacinado e castrado', temperament: 'Tranquilo e carinhoso', care: 'Gosta de ambientes seguros e enriquecidos.', gallery: catPhotos },
  4: { age: '2 anos', breed: 'Sem raça definida', size: 'Pequeno', health: 'Vacinada e vermifugada', temperament: 'Afetuosa e curiosa', care: 'Precisa de um ambiente protegido e telas nas janelas.', gallery: catPhotos },
  5: { age: '4 anos', breed: 'Sem raça definida', size: 'Médio', health: 'Vacinado e castrado', temperament: 'Leal, gentil e sociável', care: 'Se dá bem com passeios e atividades ao ar livre.', gallery: dogPhotos },
  6: { age: '8 meses', breed: 'Sem raça definida', size: 'Médio', health: 'Em recuperação; acompanhamento veterinário em andamento', temperament: 'Doce e confiante com pessoas', care: 'Precisa seguir as orientações veterinárias da ONG.', gallery: dogPhotos },
  7: { age: '1 ano', breed: 'Periquito', size: 'Pequeno', health: 'Avaliado por veterinário', temperament: 'Ativo e comunicativo', care: 'Precisa de espaço seguro para voar e estímulos diários.', gallery: birdPhotos },
  8: { age: '5 anos', breed: 'Sem raça definida', size: 'Grande', health: 'Saudável e vacinado', temperament: 'Calmo, leal e afetuoso', care: 'Indisponível para adoção no momento.', gallery: dogPhotos },
  9: { age: '2 anos', breed: 'Calopsita', size: 'Pequeno', health: 'Avaliado por veterinário', temperament: 'Curioso e sociável', care: 'Precisa de rotina, enriquecimento e espaço para voar.', gallery: birdPhotos },
  10: { age: '3 anos', breed: 'Labrador preto', size: 'Médio', health: 'Vacinada, castrada e saudável', temperament: 'Dócil, afetuosa e sociável', care: 'Gosta de passeios, companhia e brincadeiras.', gallery: dogPhotos, organization: 'ONG Colheita de Amor', location: 'Piedade' },
  11: { age: '2 anos', breed: 'Sem raça definida', size: 'Médio', health: 'Vacinada e vermifugada', temperament: 'Brincalhona e carinhosa', care: 'Precisa de passeios e convivência com a família.', gallery: dogPhotos },
  12: { age: '1 ano', breed: 'Calopsita', size: 'Pequeno', health: 'Avaliada por veterinário', temperament: 'Curiosa e ativa', care: 'Precisa de ambiente seguro, rotina e estímulos.', gallery: birdPhotos },
};

export function getPetProfile(pet) {
  const profile = profiles[pet.id] ?? {};
  const owner = Object.values(owners).find((candidate) => candidate.id === pet.ownerId) ?? owners.patasAmigas;

  return {
    ...profile,
    owner,
  };
}

export function getOwnerById(ownerId) {
  return Object.values(owners).find((owner) => owner.id === ownerId) ?? owners.patasAmigas;
}

export function getAllOwners() {
  return Object.values(owners);
}

export function getOwnerPets(ownerId, pets) {
  return pets.filter((pet) => (pet.ownerId ?? owners.patasAmigas.id) === ownerId);
}