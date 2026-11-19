import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

/**
 * Devolve uma função "voltar". Volta na história do navegador; se a pessoa chegou direto
 * pelo link (não há página anterior dentro do site), vai para `fallbackPath`.
 */
export function useGoBack(fallbackPath = '/') {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    if (location.key === 'default') navigate(fallbackPath);
    else navigate(-1);
  }, [location.key, navigate, fallbackPath]);
}
