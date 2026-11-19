import { Link } from 'react-router';

// Página 404: mostrada quando o endereço não existe (ou o animal/perfil não foi encontrado).
export function NotFound() {
  return (
    <main className="page-placeholder">
      <h1>Página não encontrada</h1>
      <p>Não encontramos o que você procurava. O endereço pode estar errado ou o conteúdo não existe mais.</p>
      <p>
        <Link to="/">Voltar para o início</Link>
      </p>
    </main>
  );
}
