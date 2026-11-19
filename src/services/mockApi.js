// Ajuda para os serviços de exemplo: devolve o valor como uma Promise, igual a uma chamada real
// a um servidor. Assim as telas já são escritas do jeito certo (esperando a resposta) e,
// quando o banco estiver integrado, só o conteúdo dos serviços muda.
export function respond(value) {
  return Promise.resolve(value);
}
