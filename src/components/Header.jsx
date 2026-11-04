export function Header({ search, onSearchChange, onHome, onSignOut, onOrganizations }) {
  return (
    <header className="site-header">
      <div className="header-top">
        <a className="brand" href="#top" onClick={onHome} aria-label="BichoAumigo, início">
          <span className="brand-mark" aria-hidden="true">🐾</span>
          <span>Bicho<span>Aumigo</span></span>
        </a>

        <label className="header-search">
          <span className="visually-hidden">Buscar pets</span>
          <input
            type="search"
            placeholder="Buscar um pet"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>

        <div className="header-actions">
          <button type="button" className="login-button" onClick={onSignOut} aria-label="Sair da conta" title="Sair da conta">
            <span aria-hidden="true">↪</span> Sair
          </button>
          <button type="button" className="favorite-button" aria-label="Favoritos">♥</button>
        </div>
      </div>

      <nav className="main-nav" aria-label="Navegação principal">
        <a href="#top" onClick={onHome}>Início</a>
        <a href="#pets" onClick={onHome}>Animais</a>
        <a
          href="#instituicoes"
          onClick={(event) => {
            event.preventDefault();
            onOrganizations();
          }}
        >
          ONGs
        </a>
        <a href="#duvidas">Dúvidas</a>
        <a href="#pets" className="nav-cta">Quero adotar</a>
        <a href="#cadastro" className="nav-cta nav-cta-filled">Cadastrar animal</a>
      </nav>
    </header>
  );
}
