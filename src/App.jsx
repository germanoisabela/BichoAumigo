import { Route, Routes } from 'react-router';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollManager } from './components/ScrollManager';
import { CreatePet } from './pages/CreatePet';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { OwnerDetails } from './pages/OwnerDetails';
import { PetDetails } from './pages/PetDetails';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';

// Mapa de rotas do site (endereço → página).
function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* Páginas públicas, sem o cabeçalho do site */}
        <Route path="/entrar" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* Páginas que exigem estar logado. Para tornar alguma pública, mova a <Route> para fora deste grupo. */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="animais/:id" element={<PetDetails />} />
            <Route path="responsavel/:id" element={<OwnerDetails />} />
            <Route path="cadastrar-animal" element={<CreatePet />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="perfil" element={<Profile />} />
          </Route>
        </Route>

        {/* Qualquer outro endereço */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
