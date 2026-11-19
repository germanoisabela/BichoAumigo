import { Link } from 'react-router';
import './PetCard.css';

export function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <Link className="pet-card-open" to={`/animais/${pet.id}`} aria-label={`Ver perfil de ${pet.name}`}>
        <div className="pet-photo-wrap">
          <img className="pet-photo" src={pet.image} alt={pet.name} loading="lazy" />
          <span className={`pet-status${pet.status === 'Disponível' ? ' status-available' : ' status-other'}`}>
            {pet.status}
          </span>
        </div>
        <div className="pet-card-info">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.type}</p>
          </div>
          <span className="pet-card-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </Link>
      <button type="button" className="pet-favorite" aria-label={`Adicionar ${pet.name} aos favoritos`}>
        ♡
      </button>
    </article>
  );
}
