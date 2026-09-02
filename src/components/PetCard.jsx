//Arquivo do card do pet - card inidividual de cada animal
import React from 'react';

export function PetCard({ name }) {
  return (
    <div style={{
      backgroundColor: '#fbe2aa',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      width: '120px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Retângulo cinza provisório enquanto você não coloca as fotos */}
      <div style={{
        width: '100%',
        height: '100px',
        backgroundColor: '#ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '12px'
      }}>
        [Foto]
      </div>
      <h3 style={{ marginTop: '12px', marginBottom: '0', color: '#333' }}>{name}</h3>
    </div>
  );
}