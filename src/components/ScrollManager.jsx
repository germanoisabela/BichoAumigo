import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Controla a rolagem da página a cada navegação:
// - link com âncora (ex.: "/#pets"): rola até o elemento com esse id;
// - qualquer outra navegação: volta para o topo da página.
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
