import { useParams } from 'react-router';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { PetProfile } from '../components/PetProfile';
import { useAsyncData } from '../hooks/useAsyncData';
import { useGoBack } from '../hooks/useGoBack';
import { getPetDetails } from '../services/petsService';
import { NotFound } from './NotFound';

// Página de um animal: rota /animais/:id
export function PetDetails() {
  const { id } = useParams();
  const goBack = useGoBack('/');
  const { data: pet, loading, error } = useAsyncData(getPetDetails, id);

  if (loading) return <Loading label="Carregando o perfil do animal..." />;
  if (error) return <ErrorMessage message="Não foi possível carregar este animal. Tente novamente em instantes." />;
  if (!pet) return <NotFound />;

  return <PetProfile pet={pet} onBack={goBack} />;
}
