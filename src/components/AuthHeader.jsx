import { Link } from 'react-router';

export function AuthBrand() {
  return (
    <Link className="auth-brand" to="/entrar" aria-label="BichoAumigo">
      <span aria-hidden="true">🐾</span> BichoAumigo
    </Link>
  );
}

export function AuthTopbar() {
  return (
    <header className="auth-topbar">
      <AuthBrand />
      <span className="secure-label">
        <span aria-hidden="true">♙</span> Ambiente
        <br />
        seguro
      </span>
    </header>
  );
}
