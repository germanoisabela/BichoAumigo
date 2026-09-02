//Arquivo do grid que junta os cards - Exibição da lista de animais.
import React from 'react';
import { PetCard } from './PetCard';

export function PetGrid() {
  const pets = [
    { id: 1, name: 'Spot' },
    { id: 2, name: 'Caramelo' },
    { id: 3, name: 'Oliver' },
    { id: 4, name: 'Amora' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {pets.map(pet => (
        <PetCard key={pet.id} name={pet.name} />
      ))}
    </div>
  );
}