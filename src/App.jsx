import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { OwnerProfile } from './components/OwnerProfile';
import { PetProfile } from './components/PetProfile';
import { LoginScreen, RegistrationScreen } from './components/AuthScreens';
import { PetGrid } from './components/PetGrid';
import { getOwnerById, getOwnerPets, getPetProfile } from './data/petProfiles';

const pets = [
  { id: 1, ownerId: 'roberto-alves', name: 'Spot', type: 'Cachorro', status: 'Disponível', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85' },
  { id: 2, ownerId: 'roberto-alves', name: 'Caramelo', type: 'Cachorro', status: 'Disponível', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=85' },
  { id: 3, name: 'Oliver', type: 'Gato', status: 'Disponível', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85' },
  { id: 4, name: 'Amora', type: 'Gato', status: 'Disponível', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=85' },
  { id: 5, ownerId: 'roberto-alves', name: 'Pretinho', type: 'Cachorro', status: 'Disponível', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=700&q=85' },
  { id: 6, name: 'Nina', type: 'Cachorro', status: 'Em recuperação', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=700&q=85' },
  { id: 7, name: 'Kiwi', type: 'Ave', status: 'Disponível', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=85' },
  { id: 8, name: 'Buddy', type: 'Cachorro', status: 'Indisponível', image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=700&q=85' },
  { id: 9, name: 'Antônio', type: 'Ave', status: 'Disponível', image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=700&q=85' },
  { id: 10, ownerId: 'ong-colheita-de-amor', name: 'Amora', type: 'Cachorro', status: 'Disponível', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7a5d?auto=format&fit=crop&w=700&q=85' },
  { id: 11, ownerId: 'ong-colheita-de-amor', name: 'Pandora', type: 'Cachorro', status: 'Disponível', image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=700&q=85' },
  { id: 12, name: 'Zoe', type: 'Ave', status: 'Disponível', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=85' },
];

const categories = [
  { name: 'Todos', icon: '🐾' },
  { name: 'Cachorro', icon: '🐶' },
  { name: 'Gato', icon: '🐱' },
  { name: 'Ave', icon: '🦜' },
  { name: 'Peixe', icon: '🐠' },
  { name: 'Outros', icon: '＋' },
];

const statuses = ['Todos', 'Disponível', 'Indisponível', 'Em recuperação'];

function App() {
  const [authScreen, setAuthScreen] = useState('login');
  const [hasEntered, setHasEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [ownerBackPet, setOwnerBackPet] = useState(null);

  const continueToHome = (owner) => {
    setCurrentUser(owner);
    setHasEntered(true);
  };

  const goHome = () => {
    setSelectedPet(null);
    setSelectedOwner(null);
    setOwnerBackPet(null);
  };

  const openOwner = (owner, returnPet = null) => {
    setSelectedPet(null);
    setSelectedOwner(owner);
    setOwnerBackPet(returnPet);
  };

  const returnFromOwner = () => {
    setSelectedOwner(null);
    setSelectedPet(ownerBackPet);
    setOwnerBackPet(null);
  };

  const signOut = () => {
    goHome();
    setCurrentUser(null);
    setAuthScreen('login');
    setHasEntered(false);
  };

  const signInAsDemo = (accountType) => {
    const ownerId = accountType === 'entity' ? 'ong-colheita-de-amor' : 'roberto-alves';
    continueToHome(getOwnerById(ownerId));
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Todos' || pet.type === category;
    const matchesStatus = status === 'Todos' || pet.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const impactStats = [
    { value: pets.length, label: 'pets na vitrine' },
    { value: pets.filter((pet) => pet.status === 'Disponível').length, label: 'disponíveis para adoção' },
    { value: new Set(pets.map((pet) => pet.type)).size, label: 'espécies representadas' },
    { value: new Set(pets.map((pet) => pet.status)).size, label: 'situações de cuidado' },
  ];

  const testimonials = [
    {
      name: 'Uma família adotante',
      quote: 'A chegada do nosso pet trouxe novos momentos de carinho e companheirismo para a casa.',
      avatar: '🐕',
    },
    {
      name: 'Uma pessoa adotante',
      quote: 'A adoção responsável nos ajudou a entender cada etapa e a nos preparar para essa nova história.',
      avatar: '🐈',
    },
    {
      name: 'Uma pessoa voluntária',
      quote: 'Ver um animal encontrar uma família preparada é uma alegria que faz todo o cuidado valer a pena.',
      avatar: '💛',
    },
  ];

  if (!hasEntered) {
    return authScreen === 'login' ? (
      <LoginScreen
        onRegister={() => setAuthScreen('register')}
        onLogin={signInAsDemo}
      />
    ) : (
      <RegistrationScreen
        onBackToLogin={() => setAuthScreen('login')}
        onRegister={continueToHome}
      />
    );
  }

  return (
    <div className="app-shell">
      <Header
        search={search}
        onSearchChange={setSearch}
        onHome={goHome}
        onSignOut={signOut}
        onProfile={() => openOwner(currentUser)}
        onOrganizations={() => openOwner(getOwnerById('ong-patas-amigas'))}
      />

      {selectedOwner ? (
        <OwnerProfile
          owner={selectedOwner}
          pets={getOwnerPets(selectedOwner.id, pets)}
          onBack={returnFromOwner}
          onSelectPet={(pet) => {
            setSelectedOwner(null);
            setOwnerBackPet(null);
            setSelectedPet(pet);
          }}
        />
      ) : selectedPet ? (
        <PetProfile
          pet={{ ...selectedPet, ...getPetProfile(selectedPet) }}
          onBack={goHome}
          onOpenOwner={(owner) => openOwner(owner, selectedPet)}
        />
      ) : (
        <main className="home-content">
        <section className="adoption-banner" aria-label="Encontre um amigo para adotar">
          <div className="banner-copy">
            <p className="banner-kicker">Um novo amigo está esperando</p>
            <h1>Não compre,<br /><span>adote!</span></h1>
            <p>Encontre seu companheiro para a vida.</p>
            <a className="banner-link" href="#pets">Encontrar meu pet <span aria-hidden="true">→</span></a>
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
              {statuses.map((petStatus) => (
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
              {categories.map((item) => (
                <button
                  className={`category-button${category === item.name ? ' is-selected' : ''}`}
                  key={item.name}
                  type="button"
                  aria-pressed={category === item.name}
                  onClick={() => setCategory(item.name === 'Outros' ? 'Todos' : item.name)}
                >
                  <span className="category-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.name === 'Cachorro' ? 'Cães' : item.name === 'Gato' ? 'Gatos' : item.name === 'Ave' ? 'Aves' : item.name}</span>
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
            <span className="pet-count">{filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}</span>
          </div>
          <PetGrid pets={filteredPets} onSelectPet={setSelectedPet} />
          {filteredPets.length === 0 && (
            <p className="empty-state">Nenhum pet encontrado com esses filtros. Tente outra busca.</p>
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
      )}
    </div>
  );
}

export default App;