import { PetCard } from './PetCard';

export function PetGrid({ pets }) {
  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
