import { DEFAULT_OWNER_ID, owners } from '../data/owners';
import { listPetsByOwner } from './petsService';

// Procura um responsável (pessoa ou ONG) pelo id. Devolve `null` se não existir.
export function findOwner(ownerId) {
  return Object.values(owners).find((owner) => owner.id === ownerId) ?? null;
}

// Responsável de um animal; sem responsável cadastrado, usa a ONG padrão.
export function findPetOwner(pet) {
  return findOwner(pet.ownerId ?? DEFAULT_OWNER_ID) ?? findOwner(DEFAULT_OWNER_ID);
}

// Retorna `{ owner, pets }` com o responsável e os animais anunciados por ele, ou `null`.
export async function getOwnerWithPets(ownerId) {
  const ownerPets = await listPetsByOwner(ownerId);
  if (ownerPets.length === 0) return null;

  return { owner: ownerPets[0].owner, pets: ownerPets };
}
