import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { AuthBrand, AuthTopbar } from '../components/AuthHeader';
import { ACCOUNT_TYPES } from '../constants/accountTypes';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

export function Login() {
  const { isAuthenticated, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(ACCOUNT_TYPES.INDIVIDUAL);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  // Já está logado? Vai direto para a página que queria abrir (ou para a home).
  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/'} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signIn(accountType);
    } catch {
      setMessage('Não foi possível entrar agora. Tente novamente em instantes.');
    }
  }

  return (
    <div className="auth-page">
      <AuthTopbar />
      <main className="login-panel">
        <div className="login-brand-lockup"><AuthBrand /></div>
        <p className="auth-eyebrow">Seu próximo encontro começa aqui</p>
        <h1>Entre na sua conta</h1>

        <form className="auth-form login-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="visually-hidden">E-mail</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="auth-field password-field">
            <span className="visually-hidden">Senha</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </label>

          <fieldset className="login-account-type">
            <legend>Acessar demonstração como</legend>
            <label>
              <input type="radio" name="loginAccountType" value={ACCOUNT_TYPES.INDIVIDUAL} checked={accountType === ACCOUNT_TYPES.INDIVIDUAL} onChange={() => setAccountType(ACCOUNT_TYPES.INDIVIDUAL)} />
              <span>Pessoa</span>
            </label>
            <label>
              <input type="radio" name="loginAccountType" value={ACCOUNT_TYPES.ENTITY} checked={accountType === ACCOUNT_TYPES.ENTITY} onChange={() => setAccountType(ACCOUNT_TYPES.ENTITY)} />
              <span>ONG</span>
            </label>
          </fieldset>

          <button className="forgot-password" type="button" onClick={() => setMessage('A recuperação de senha será conectada quando o sistema de contas estiver configurado.')}>
            Esqueci minha senha
          </button>
          {message && <p className="auth-feedback" role="status">{message}</p>}

          <button className="auth-submit" type="submit">Entrar</button>
        </form>

        <p className="auth-switch-copy">
          Ainda não tem conta?{' '}
          <Link className="auth-text-button" to="/cadastro">Criar conta</Link>
        </p>
        <p className="auth-legal-copy">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
        <p className="auth-demo-note">Protótipo demonstrativo: o login ainda não verifica nem armazena credenciais.</p>
      </main>
    </div>
  );
}
