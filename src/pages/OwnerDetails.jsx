import { useParams } from 'react-router';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { OwnerProfile } from '../components/OwnerProfile';
import { useAsyncData } from '../hooks/useAsyncData';
import { useGoBack } from '../hooks/useGoBack';
import { getOwnerWithPets } from '../services/ownersService';
import { NotFound } from './NotFound';

// Página de um responsável (pessoa ou ONG): rota /responsavel/:id
export function OwnerDetails() {
  const { id } = useParams();
  const goBack = useGoBack('/');
  const { data, loading, error } = useAsyncData(getOwnerWithPets, id);

  if (loading) return <Loading label="Carregando o perfil..." />;
  if (error) return <ErrorMessage message="Não foi possível carregar este perfil. Tente novamente em instantes." />;
  if (!data) return <NotFound />;

  return <OwnerProfile owner={data.owner} pets={data.pets} onBack={goBack} />;
}
