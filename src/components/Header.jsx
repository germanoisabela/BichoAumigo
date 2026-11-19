import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const ORGANIZATIONS_PATH = '/responsavel/ong-patas-amigas';

export function Header({ search, onSearchChange }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    navigate('/entrar', { replace: true });
    signOut();
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <Link className="brand" to="/" aria-label="BichoAumigo, início">
          <span className="brand-mark" aria-hidden="true">
            🐾
          </span>
          <span>
            Bicho<span>Aumigo</span>
          </span>
        </Link>

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
          <Link className="login-button" to="/perfil" aria-label="Meu perfil" title="Meu perfil">
            <span aria-hidden="true">☺</span> Meu perfil
          </Link>
          <button
            type="button"
            className="login-button"
            onClick={handleSignOut}
            aria-label="Sair da conta"
            title="Sair da conta"
          >
            <span aria-hidden="true">↪</span> Sair
          </button>
          <Link className="favorite-button" to="/favoritos" aria-label="Favoritos">
            ♥
          </Link>
        </div>
      </div>

      <nav className="main-nav" aria-label="Navegação principal">
        <Link to="/">Início</Link>
        <Link to="/#pets">Animais</Link>
        <Link to={ORGANIZATIONS_PATH}>ONGs</Link>
        <a href="#duvidas">Dúvidas</a>
        <Link to="/#pets" className="nav-cta">
          Quero adotar
        </Link>
        <Link to="/cadastrar-animal" className="nav-cta nav-cta-filled">
          Cadastrar animal
        </Link>
      </nav>
    </header>
  );
}
