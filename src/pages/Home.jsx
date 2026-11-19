import { useState } from 'react';
import { Link, useOutletContext } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { PetGrid } from '../components/PetGrid';
import { CATEGORIES } from '../constants/categories';
import { ALL } from '../constants/filters';
import { PET_STATUS, STATUS_FILTERS } from '../constants/petStatuses';
import { testimonials } from '../data/testimonials';
import { useAsyncData } from '../hooks/useAsyncData';
import { listPets } from '../services/petsService';
import './Home.css';

export function Home() {
  // O texto da busca vem do AppLayout (compartilhado com o campo de busca do cabeçalho).
  const { search, setSearch } = useOutletContext();
  const [category, setCategory] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const { data, loading, error } = useAsyncData(listPets);

  const pets = data ?? [];

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === ALL || pet.type === category;
    const matchesStatus = status === ALL || pet.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const impactStats = [
    { value: pets.length, label: 'pets na vitrine' },
    { value: pets.filter((pet) => pet.status === PET_STATUS.AVAILABLE).length, label: 'disponíveis para adoção' },
    { value: new Set(pets.map((pet) => pet.type)).size, label: 'espécies representadas' },
    { value: new Set(pets.map((pet) => pet.status)).size, label: 'situações de cuidado' },
  ];

  return (
    <main className="home-content">
      <section className="adoption-banner" aria-label="Encontre um amigo para adotar">
        <div className="banner-copy">
          <p className="banner-kicker">Um novo amigo está esperando</p>
          <h1>Não compre,<br /><span>adote!</span></h1>
          <p>Encontre seu companheiro para a vida.</p>
          <Link className="banner-link" to="/#pets">Encontrar meu pet <span aria-hidden="true">→</span></Link>
        </div>
        <img
          className="banner-image"
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85"
          alt="Cachorro esperando por uma família"
        />
        <span className="banner-paw" aria-hidden="true">🐾</span>
      </section>

      <section className="pet-finder" aria-label="Encontre animais para adoção">
        <div className="filter-row">
          <label className="search-field">
            <span className="visually-hidden">Buscar animal pelo nome</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Qual pet você procura?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <fieldset className="status-filters">
            <legend className="visually-hidden">Filtrar por disponibilidade</legend>
            {STATUS_FILTERS.map((petStatus) => (
              <label key={petStatus} className="status-option">
                <input
                  type="radio"
                  name="status"
                  value={petStatus}
                  checked={status === petStatus}
                  onChange={() => setStatus(petStatus)}
                />
                <span>{petStatus}</span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className="category-section">
          <h2>Categorias</h2>
          <div className="category-list" aria-label="Filtrar por categoria">
            {CATEGORIES.map((item) => (
              <button
                className={`category-button${category === item.name ? ' is-selected' : ''}`}
                key={item.name}
                type="button"
                aria-pressed={category === item.name}
                onClick={() => setCategory(item.name === 'Outros' ? ALL : item.name)}
              >
                <span className="category-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pets-section" id="pets">
        <div className="pets-heading">
          <div>
            <p className="section-eyebrow">Adoção responsável</p>
            <h2>Pets esperando por você</h2>
          </div>
          {!loading && !error && (
            <span className="pet-count">{filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}</span>
          )}
        </div>

        {loading && <Loading label="Carregando os animais..." />}
        {error && <ErrorMessage message="Não foi possível carregar os animais. Tente novamente em instantes." />}
        {!loading && !error && (
          <>
            <PetGrid pets={filteredPets} />
            {filteredPets.length === 0 && (
              <EmptyState>Nenhum pet encontrado com esses filtros. Tente outra busca.</EmptyState>
            )}
          </>
        )}
      </section>

      <section className="impact-section" aria-labelledby="impact-title">
        <div className="impact-copy">
          <p className="impact-eyebrow">Adoção responsável transforma histórias</p>
          <h2 id="impact-title">Um novo começo muda a vida de todos.</h2>
          <p>Conheça os animais que estão esperando por uma família e descubra como cada adoção pode abrir espaço para outra história.</p>
        </div>
        <div className="impact-stats">
          {impactStats.map((stat) => (
            <div className="impact-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="community-section" id="ongs" aria-label="Adoção responsável e instituições parceiras">
        <article className="responsible-panel">
          <p className="section-eyebrow">Um compromisso para a vida</p>
          <h2>Adoção responsável começa com cuidado.</h2>
          <p>Adotar é acolher um novo integrante da família. Considere seu tempo, espaço e condições para oferecer segurança, atenção e acompanhamento veterinário.</p>
          <a className="institution-link" href="#instituicoes">Conheça as instituições <span aria-hidden="true">→</span></a>
        </article>

        <div className="partners-panel" id="instituicoes">
          <p className="section-eyebrow">Juntos por eles</p>
          <h2>Rede de cuidado</h2>
          <p>ONGs e protetores fazem a diferença em cada etapa da adoção.</p>
          <div className="partner-marks" aria-label="Espaços para instituições parceiras">
            <span className="partner-mark" aria-label="Instituição parceira"><span aria-hidden="true">🐾</span></span>
            <span className="partner-mark" aria-label="Instituição parceira"><span aria-hidden="true">♥</span></span>
            <span className="partner-mark" aria-label="Instituição parceira"><span aria-hidden="true">🐾</span></span>
            <span className="partner-mark" aria-label="Instituição parceira"><span aria-hidden="true">♥</span></span>
          </div>
        </div>
      </section>

      <section className="testimonials-section" aria-labelledby="testimonials-title">
        <div className="testimonials-heading">
          <div>
            <p className="section-eyebrow">Relatos da comunidade</p>
            <h2 id="testimonials-title">Histórias que aquecem o coração</h2>
          </div>
          <span className="sample-label">Conteúdo demonstrativo</span>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <span className="quote-mark" aria-hidden="true">“</span>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">{testimonial.avatar}</span>
                <span>
                  <strong>{testimonial.name}</strong>
                  <small>Relato de exemplo</small>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
