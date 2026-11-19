import { createContext } from 'react';

// "Caixa" compartilhada com os dados de quem está logado.
// Quem preenche essa caixa é o AuthProvider; quem lê usa o hook useAuth().
export const AuthContext = createContext(null);
