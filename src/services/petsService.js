import { DEFAULT_OWNER_ID } from '../data/owners';
import { petProfiles } from '../data/petProfiles';
import { pets } from '../data/pets';
import { findPetOwner } from './ownersService';
import { respond } from './mockApi';

// Lista todos os animais (versão resumida, usada nos cards da home).
export function listPets() {
  return respond(pets);
}

// Lista os animais anunciados por um responsável.
export function listPetsByOwner(ownerId) {
  return respond(pets.filter((pet) => (pet.ownerId ?? DEFAULT_OWNER_ID) === ownerId));
}

// Retorna um animal com todos os detalhes (perfil + responsável), ou `null` se não existir.
// O `id` pode chegar como texto (vem da URL, ex.: "/animais/3"), por isso o Number().
export function getPetDetails(id) {
  const pet = pets.find((candidate) => candidate.id === Number(id));
  if (!pet) return respond(null);

  return respond({ ...pet, ...petProfiles[pet.id], owner: findPetOwner(pet) });
}
