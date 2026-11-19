// Detalhes de cada animal de exemplo (idade, porte, saúde, fotos...), indexados pelo id do animal.
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

export const petProfiles = {
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
