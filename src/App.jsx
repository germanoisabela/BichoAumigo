import React from 'react'; // importando o componente criado na pasta components
import { Header } from './components/Header';
import {PetGrid} from './components/PetGrid';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
      {/* Header no topo */}
      <Header />

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}>
          Pets para Adoção
        </h2>
        <PetGrid />
      </main>
    </div>
  );
}

export default App;