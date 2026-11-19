import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Uso: const { currentUser, isAuthenticated, signIn, register, signOut } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de <AuthProvider>.');
  }
  return context;
}
