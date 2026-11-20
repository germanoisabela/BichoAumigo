import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { OwnerProfile } from '../components/OwnerProfile';
import { useAsyncData } from '../hooks/useAsyncData';
import { useAuth } from '../hooks/useAuth';
import { useGoBack } from '../hooks/useGoBack';
import { listPetsByOwner } from '../services/petsService';

// Perfil de quem está logado: rota /perfil.
// Por enquanto mostra o mesmo perfil público; a edição dos dados vem numa etapa futura.
export function Profile() {
  const { currentUser } = useAuth();
  const goBack = useGoBack('/');
  const { data: pets, loading, error } = useAsyncData(listPetsByOwner, currentUser.id);

  if (loading) return <Loading label="Carregando seu perfil..." />;
  if (error) {
    const message = error.message.includes('perfil de demonstração')
      ? error.message
      : 'Não foi possível carregar seu perfil. Tente novamente em instantes.';
    return <ErrorMessage message={message} />;
  }

  return <OwnerProfile owner={currentUser} pets={pets} onBack={goBack} />;
}
