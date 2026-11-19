import { ALL } from './filters';

// Categorias mostradas na home.
// `name` é o valor guardado no animal (campo `type`); `label` é o texto mostrado ao visitante.
export const CATEGORIES = [
  { name: ALL, label: 'Todos', icon: '🐾' },
  { name: 'Cachorro', label: 'Cães', icon: '🐶' },
  { name: 'Gato', label: 'Gatos', icon: '🐱' },
  { name: 'Ave', label: 'Aves', icon: '🦜' },
  { name: 'Peixe', label: 'Peixe', icon: '🐠' },
  { name: 'Outros', label: 'Outros', icon: '＋' },
];
