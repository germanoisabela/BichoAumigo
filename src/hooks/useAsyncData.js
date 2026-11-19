import { useEffect, useState } from 'react';

/**
 * Carrega dados de um serviço (função que devolve uma Promise) e informa o estado da busca.
 *
 * Uso:   const { data, loading, error } = useAsyncData(getPetDetails, id);
 *
 * - `loader` precisa ser uma função fixa, importada de um serviço (ex.: getPetDetails);
 * - `arg` é o argumento passado para ela. Quando `arg` muda (ex.: outro id na URL), busca de novo.
 */
export function useAsyncData(loader, arg) {
  const [state, setState] = useState({ done: false, arg: undefined, data: null, error: null });

  useEffect(() => {
    let ignore = false; // evita atualizar a tela se o componente já saiu ou o arg mudou

    loader(arg)
      .then((data) => {
        if (!ignore) setState({ done: true, arg, data, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ done: true, arg, data: null, error });
      });

    return () => {
      ignore = true;
    };
  }, [loader, arg]);

  // Enquanto não chegou resposta para o `arg` atual, ainda está carregando.
  const loading = !state.done || state.arg !== arg;
  return { data: loading ? null : state.data, loading, error: loading ? null : state.error };
}
