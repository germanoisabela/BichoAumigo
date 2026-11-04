export function ProfileAccess({ owners, pets, onBack, onOpenOwner }) {
  return (
    <main className="profile-access-page">
      <button className="profile-back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Voltar para a home
      </button>

      <section className="access-heading" aria-labelledby="access-title">
        <p className="section-eyebrow">BichoAumigo</p>
        <h1 id="access-title">Acesse um perfil</h1>
        <p>Escolha uma conta de demonstração para conhecer os perfis de protetores e instituições.</p>
      </section>

      <section className="access-profile-list" aria-label="Perfis disponíveis">
        {owners.map((owner) => {
          const petCount = pets.filter((pet) => (pet.ownerId ?? 'ong-patas-amigas') === owner.id).length;
          const isOrganization = owner.type === 'organization';

          return (
            <article className="access-profile" key={owner.id}>
              <img src={owner.image} alt="" />
              <div className="access-profile-copy">
                <span className="access-profile-type">{isOrganization ? 'ONG' : 'Usuário protetor'}</span>
                <h2>{owner.name}</h2>
                <p>{owner.description} · {owner.location}</p>
                <small>{petCount} {petCount === 1 ? 'pet anunciado' : 'pets anunciados'}</small>
              </div>
              <button className="access-profile-button" type="button" onClick={() => onOpenOwner(owner)}>
                Abrir perfil <span aria-hidden="true">→</span>
              </button>
            </article>
          );
        })}
      </section>

      <p className="access-demo-note">Estes perfis são demonstrações. A entrada de contas reais exige cadastro e autenticação.</p>
    </main>
  );
}