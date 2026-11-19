// Regras de senha mostradas no cadastro. Retorna uma lista com o texto de cada regra
// e se a senha digitada já cumpre essa regra.
export function getPasswordChecks(password) {
  return [
    { label: 'Mínimo de 8 caracteres', valid: password.length >= 8 },
    { label: 'Letra minúscula', valid: /[a-z]/.test(password) },
    { label: 'Número', valid: /\d/.test(password) },
    { label: 'Letra maiúscula', valid: /[A-Z]/.test(password) },
  ];
}
