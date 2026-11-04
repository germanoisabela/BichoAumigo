import { PetCard } from './PetCard';

export function PetGrid({ pets, onSelectPet }) {
  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onSelect={() => onSelectPet(pet)} />
      ))}
    </div>
  );
}