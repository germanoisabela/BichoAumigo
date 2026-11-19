import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// Estilos globais. A ordem importa: variáveis primeiro, depois a base e os estilos compartilhados.
// Os estilos de cada componente/página são importados dentro do próprio componente.
import './styles/variables.css';
import './index.css';
import './styles/common.css';
import './styles/contact.css';

import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
