import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';

// Estrutura comum das páginas do site: cabeçalho no topo e, abaixo, a página da rota atual (<Outlet />).
// O texto da busca fica aqui para o campo do cabeçalho e o da home usarem o mesmo valor.
export function AppLayout() {
  const [search, setSearch] = useState('');

  return (
    <div className="app-shell">
      <Header search={search} onSearchChange={setSearch} />
      <Outlet context={{ search, setSearch }} />
    </div>
  );
}
