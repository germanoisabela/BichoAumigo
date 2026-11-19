// Mensagem mostrada quando uma lista está vazia (nenhum resultado).
export function EmptyState({ children }) {
  return <p className="empty-state">{children}</p>;
}
