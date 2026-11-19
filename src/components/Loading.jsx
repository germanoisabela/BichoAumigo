// Mensagem mostrada enquanto os dados estão sendo carregados.
export function Loading({ label = 'Carregando...' }) {
  return (
    <p className="state-message" role="status">
      {label}
    </p>
  );
}
