import { useState } from 'react';
import { Link } from 'react-router';
import { buildWhatsAppUrl } from '../utils/phone';
import './PetProfile.css';

export function PetProfile({ pet, onBack }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = [...new Set([pet.image, ...(pet.gallery ?? [])].filter(Boolean))];
  const currentPhoto = photos[activePhoto] ?? photos[0];
  const contactUrl = buildWhatsAppUrl(
    pet.owner.whatsappNumber,
    `Olá! Tenho interesse em conhecer ${pet.name} para adoção. Poderia me passar mais informações?`,
  );

  return (
    <main className="profile-page">
      <button className="profile-back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Voltar para os animais
      </button>

      <section className="profile-intro" aria-labelledby="profile-name">
        <div className="profile-cover">
          {currentPhoto ? (
            <img className="profile-main-photo" src={currentPhoto} alt={`${pet.name}, foto ${activePhoto + 1}`} />
          ) : (
            <div className="profile-main-photo profile-photo-placeholder">Foto não disponível</div>
          )}
          <button className="profile-heart" type="button" aria-label={`Adicionar ${pet.name} aos favoritos`}>♡</button>
          {photos.length > 0 && <span className="profile-photo-count">{activePhoto + 1} / {photos.length}</span>}
        </div>

        <div className="profile-summary">
          <p className="section-eyebrow">Conheça seu novo amigo</p>
          <div className="profile-title-row">
            <h1 id="profile-name">{pet.name}</h1>
            <span className={`profile-status${pet.status === 'Disponível' ? ' status-available' : ' status-other'}`}>
              {pet.status}
            </span>
          </div>
          <p className="profile-type">{pet.type} <span aria-hidden="true">·</span> {pet.breed}</p>

          <section className="profile-about">
            <h2>Sobre {pet.name}</h2>
            <p>
              {pet.description ||
                `${pet.name} está aguardando uma família preparada. Converse com a pessoa ou instituição responsável para saber mais sobre sua história e seus cuidados.`}
            </p>
          </section>

          <section className="profile-facts">
            <h2>Informações</h2>
            <dl>
              {pet.age && <div><dt>Idade aproximada</dt><dd>{pet.age}</dd></div>}
              {pet.sex && <div><dt>Sexo</dt><dd>{pet.sex}</dd></div>}
              {pet.size && <div><dt>Porte</dt><dd>{pet.size}</dd></div>}
              {pet.breed && <div><dt>Raça</dt><dd>{pet.breed}</dd></div>}
              <div>
                <dt>Responsável</dt>
                <dd>
                  <Link className="owner-profile-link" to={`/responsavel/${pet.owner.id}`}>
                    {pet.owner.name} <span aria-hidden="true">↗</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </section>
          <p className="profile-demo-note">As informações são fornecidas pelo responsável; confirme os detalhes antes da adoção.</p>
        </div>
      </section>

      <section className="profile-gallery" aria-labelledby="gallery-title">
        <div className="profile-section-heading">
          <div>
            <p className="section-eyebrow">Um pouco mais de perto</p>
            <h2 id="gallery-title">Fotos de {pet.name}</h2>
          </div>
          <span>{photos.length} {photos.length === 1 ? 'foto' : 'fotos'}</span>
        </div>
        {photos.length > 0 ? (
          <div className="profile-photo-grid">
            {photos.map((photo, index) => (
              <button
                className={`profile-photo-button${activePhoto === index ? ' is-active' : ''}`}
                key={`${pet.id}-${photo}`}
                type="button"
                aria-label={`Ver foto ${index + 1} de ${pet.name}`}
                aria-pressed={activePhoto === index}
                onClick={() => setActivePhoto(index)}
              >
                <img src={photo} alt={`${pet.name}, foto ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        ) : (
          <p className="gallery-demo-note">O responsável ainda não adicionou fotos para este animal.</p>
        )}
      </section>

      <section className="profile-contact" id="contato-ong" aria-labelledby="contact-title">
        <div className="contact-copy">
          <p className="section-eyebrow">Deu match?</p>
          <h2 id="contact-title">Quer conhecer {pet.name}?</h2>
          <p>Converse com a pessoa ou instituição responsável para saber mais, tirar dúvidas e combinar os próximos passos da adoção.</p>
          <div className="contact-organization">
            <span className="contact-mark" aria-hidden="true">{pet.owner.type === 'organization' ? '🐾' : '♡'}</span>
            <span><strong>{pet.owner.name}</strong><small>{pet.owner.location}</small></span>
          </div>
        </div>
        <a className="contact-button" href={contactUrl} target="_blank" rel="noreferrer">
          Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className="contact-demo-note">
          {pet.owner.whatsappNumber
            ? 'Você será direcionado para o WhatsApp do responsável.'
            : 'O WhatsApp do responsável ainda não foi informado.'}
        </p>
      </section>
    </main>
  );
}