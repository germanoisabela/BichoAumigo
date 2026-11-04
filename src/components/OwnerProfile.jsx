import { PetGrid } from './PetGrid';

export function OwnerProfile({ owner, pets, onBack, onSelectPet }) {
  const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre os animais do perfil de ${owner.name}.`);
  const whatsappUrl = owner.whatsappNumber
    ? `https://wa.me/${owner.whatsappNumber}?text=${message}`
    : `https://wa.me/?text=${message}`;
  const isOrganization = owner.type === 'organization';

  return (
    <main className="owner-profile">
      <button className="profile-back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Voltar
      </button>

      <section className="owner-intro" aria-labelledby="owner-name">
        <div className="owner-photo-wrap">
          <img className="owner-photo" src={owner.image} alt={owner.name} />
        </div>
        <div className="owner-summary">
          <p className="section-eyebrow">{isOrganization ? 'Instituição de proteção animal' : 'Comunidade BichoAumigo'}</p>
          <div className="owner-title-row">
            <h1 id="owner-name">{owner.name}</h1>
            <span className="owner-type-badge">{isOrganization ? 'ONG' : 'Protetor independente'}</span>
          </div>
          <p className="owner-location"><span aria-hidden="true">⌖</span> {owner.location}</p>
          <p className="owner-description">{owner.about}</p>
          <dl className="owner-facts">
            <div><dt>Perfil</dt><dd>{owner.description}</dd></div>
            <div><dt>Pets anunciados</dt><dd>{pets.length}</dd></div>
            {isOrganization && <div><dt>Atuação</dt><dd>Acolhimento e adoção responsável</dd></div>}
          </dl>
        </div>
      </section>

      <section className="owner-pets" aria-labelledby="owner-pets-title">
        <div className="pets-heading">
          <div>
            <p className="section-eyebrow">Conheça quem está sob seus cuidados</p>
            <h2 id="owner-pets-title">Pets anunciados por {isOrganization ? 'esta ONG' : owner.name}</h2>
          </div>
          <span className="pet-count">{pets.length} {pets.length === 1 ? 'pet' : 'pets'}</span>
        </div>
        {pets.length > 0 ? (
          <PetGrid pets={pets} onSelectPet={onSelectPet} />
        ) : (
          <p className="empty-state">Este perfil ainda não tem pets publicados.</p>
        )}
      </section>

      <section className="profile-contact owner-contact" aria-labelledby="owner-contact-title">
        <div className="contact-copy">
          <p className="section-eyebrow">Ficou com alguma dúvida?</p>
          <h2 id="owner-contact-title">Fale com {isOrganization ? 'a ONG' : owner.name}</h2>
          <p>Entre em contato para saber mais sobre os pets, entender o processo e conversar sobre uma adoção responsável.</p>
          <div className="contact-organization">
            <span className="contact-mark" aria-hidden="true">{isOrganization ? '🐾' : '♡'}</span>
            <span><strong>{owner.name}</strong><small>{owner.location}</small></span>
          </div>
        </div>
        <a className="contact-button" href={whatsappUrl} target="_blank" rel="noreferrer">
          Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className="contact-demo-note">
          {owner.whatsappNumber
            ? 'Você será direcionado para o WhatsApp deste perfil.'
            : 'O WhatsApp ainda não foi informado; por enquanto, escolha um destinatário no WhatsApp.'}
        </p>
      </section>
    </main>
  );
}