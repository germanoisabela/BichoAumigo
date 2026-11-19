// Mensagem mostrada quando algo dá errado ao carregar os dados.
export function ErrorMessage({ message = 'Algo deu errado. Tente novamente em instantes.' }) {
  return (
    <p className="state-message state-message-error" role="alert">
      {message}
    </p>
  );
}
