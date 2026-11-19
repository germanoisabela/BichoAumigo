import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';

// Protege um grupo de rotas: quem não está logado é enviado para /entrar.
// Guardamos a página que a pessoa queria abrir para voltar a ela depois do login.
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to="/entrar" replace state={{ from }} />;
  }

  return <Outlet />;
}
