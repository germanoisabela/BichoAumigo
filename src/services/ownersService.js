import { DEFAULT_OWNER_ID, owners } from '../data/owners';
import { pets } from '../data/pets';
import { respond } from './mockApi';

// Procura um responsável (pessoa ou ONG) pelo id. Devolve `null` se não existir.
export function findOwner(ownerId) {
  return Object.values(owners).find((owner) => owner.id === ownerId) ?? null;
}

// Responsável de um animal; sem responsável cadastrado, usa a ONG padrão.
export function findPetOwner(pet) {
  return findOwner(pet.ownerId ?? DEFAULT_OWNER_ID) ?? findOwner(DEFAULT_OWNER_ID);
}

// Retorna `{ owner, pets }` com o responsável e os animais anunciados por ele, ou `null`.
export function getOwnerWithPets(ownerId) {
  const owner = findOwner(ownerId);
  if (!owner) return respond(null);

  const ownerPets = pets.filter((pet) => (pet.ownerId ?? DEFAULT_OWNER_ID) === owner.id);
  return respond({ owner, pets: ownerPets });
}
