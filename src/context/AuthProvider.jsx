import { useCallback, useMemo, useState } from 'react';
import { registerDemoUser, signInDemo } from '../services/authService';
import { AuthContext } from './AuthContext';

const STORAGE_KEY = 'bichoaumigo:demo-user';

// Guardamos o usuário de demonstração só durante a sessão do navegador (some ao fechar a aba),
// para o login não se perder ao recarregar a página. Isso é TEMPORÁRIO: o login real vai
// substituir esta parte.
function loadStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // storage indisponível ou conteúdo inválido: começa deslogado
  }
}

function storeUser(user) {
  try {
    if (user) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // sem storage, o app continua funcionando (só não lembra do login ao recarregar)
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadStoredUser);

  const startSession = useCallback((user) => {
    storeUser(user);
    setCurrentUser(user);
    return user;
  }, []);

  const signIn = useCallback(
    async (accountType) => startSession(await signInDemo(accountType)),
    [startSession],
  );

  const register = useCallback(
    async (values) => startSession(await registerDemoUser(values)),
    [startSession],
  );

  const signOut = useCallback(() => startSession(null), [startSession]);

  const value = useMemo(
    () => ({ currentUser, isAuthenticated: currentUser !== null, signIn, register, signOut }),
    [currentUser, signIn, register, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
