import { ALL } from './filters';

export const PET_STATUS = {
  AVAILABLE: 'Disponível',
  UNAVAILABLE: 'Indisponível',
  RECOVERING: 'Em recuperação',
};

// Opções do filtro de disponibilidade na home.
export const STATUS_FILTERS = [ALL, PET_STATUS.AVAILABLE, PET_STATUS.UNAVAILABLE, PET_STATUS.RECOVERING];
