/**
 * Deixa um telefone brasileiro no formato que o WhatsApp (wa.me) espera: só dígitos,
 * com o código do país (55) na frente.
 *
 * Como decidir se o 55 já está lá? Pela QUANTIDADE de dígitos, e não pelo começo do número:
 * - DDD (2) + número (8 ou 9) = 10 ou 11 dígitos → falta o 55;
 * - com o 55 na frente = 12 ou 13 dígitos → já está completo.
 * (Olhar só se começa com "55" daria errado para o DDD 55, do Rio Grande do Sul.)
 */
export function normalizeBrazilPhone(value) {
  const digits = String(value ?? '')
    .replace(/\D/g, '') // tira tudo que não é número: (, ), -, espaços...
    .replace(/^0+/, ''); // tira zeros à esquerda (ex.: 0 + DDD)

  if (!digits) return '';
  return digits.length <= 11 ? `55${digits}` : digits;
}

/**
 * Monta o link do WhatsApp com uma mensagem pronta.
 * Se não houver número, abre o WhatsApp sem destinatário (comportamento atual do projeto).
 */
export function buildWhatsAppUrl(phone, message) {
  const text = encodeURIComponent(message);
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}
