import React from 'react';

export function Header() {
  return (
    <header style={{ backgroundColor: '#FFF6DF', width: '100%', paddingBottom: '15px' }}>
      {/* 1. Barra Superior (Logo, Pesquisa, Login, Favoritos) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logotipo */}
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#000' }}>
          🐾 BichoAumigo
        </div>

        {/* Campo de Pesquisa */}
        <div style={{ flex: 1, maxWidth: '300px', margin: '0 20px' }}>
          <input
            type="text"
            placeholder="Pesquise aqui..."
            style={{
              width: '100%',
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid #E0E0E0',
              outline: 'none',
              fontSize: '12px'
            }}
          />
        </div>

        {/* Ações de Usuário */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '12px' }}>
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            👤 Login or sign in
          </button>
          <span style={{ cursor: 'pointer', fontSize: '16px' }}>❤️</span>
        </div>
      </div>

      {/* 2. Links de Navegação Principal */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        padding: '8px 0',
        fontSize: '13px',
        fontWeight: '500'
      }}>
        <a href="#institutional" style={{ color: '#333', textDecoration: 'none' }}>Instituições</a>
        <a href="#ongs" style={{ color: '#333', textDecoration: 'none' }}>ONGs</a>
        <a href="#social-projects" style={{ color: '#333', textDecoration: 'none' }}>Projetos Sociais</a>
        <a href="#want-to-adopt" style={{ color: '#333', textDecoration: 'none' }}>Quer Adotar</a>
        <a href="#become-partner" style={{ color: '#333', textDecoration: 'none' }}>Torne-se Nosso Parceiro</a>
      </nav>

      {/* 3. Botões de Acesso Rápido (Pílulas amarelas) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '10px'
      }}>
        <button style={pillButtonStyle}>Loja Pet</button>
        <button style={{ ...pillButtonStyle, backgroundColor: '#EAA937', color: '#FFF' }}>para preencher</button>
        <button style={pillButtonStyle}>para preencher</button>
      </div>
    </header>
  );
}

// Estilo reutilizável para as pílulas inferiores
const pillButtonStyle = {
  backgroundColor: '#FFF',
  border: '1px solid #EAA937',
  borderRadius: '20px',
  padding: '6px 16px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer'
};