import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import { AuthBrand, AuthTopbar } from '../components/AuthHeader';
import { ACCOUNT_TYPES } from '../constants/accountTypes';
import { useAuth } from '../hooks/useAuth';
import { getPasswordChecks } from '../utils/password';
import './Auth.css';

export function Register() {
  const { isAuthenticated, register } = useAuth();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPES.INDIVIDUAL);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordChecks = getPasswordChecks(password);

  // Conta criada (já está logado)? Vai para a home.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Confira os dois campos.');
      return;
    }
    setError('');
    const formData = new FormData(event.currentTarget);
    const isOrganization = accountType === ACCOUNT_TYPES.ENTITY;

    try {
      await register({
        accountType,
        name: String(formData.get(isOrganization ? 'organizationName' : 'fullName')),
        mobile: String(formData.get('mobile') ?? ''),
      });
    } catch {
      setError('Não foi possível criar a conta agora. Tente novamente em instantes.');
    }
  }

  return (
    <div className="auth-page registration-page">
      <AuthTopbar />
      <main className="registration-panel">
        <div className="registration-heading">
          <AuthBrand />
          <p className="auth-eyebrow">Faça parte da rede de adoção</p>
          <h1>Crie sua conta</h1>
          <p>Cadastre-se para encontrar pets ou divulgar animais que precisam de um lar.</p>
        </div>

        <form className="auth-form registration-form" onSubmit={handleSubmit}>
          <fieldset className="account-type-fieldset">
            <legend>Tipo de cadastro</legend>
            <label>
              <input type="radio" name="accountType" value={ACCOUNT_TYPES.INDIVIDUAL} checked={accountType === ACCOUNT_TYPES.INDIVIDUAL} onChange={() => setAccountType(ACCOUNT_TYPES.INDIVIDUAL)} />
              <span>Pessoa física</span>
            </label>
            <label>
              <input type="radio" name="accountType" value={ACCOUNT_TYPES.ENTITY} checked={accountType === ACCOUNT_TYPES.ENTITY} onChange={() => setAccountType(ACCOUNT_TYPES.ENTITY)} />
              <span>ONG ou entidade</span>
            </label>
          </fieldset>

          {accountType === ACCOUNT_TYPES.INDIVIDUAL ? (
            <>
              <label className="auth-labeled-field">
                <span>Nome completo</span>
                <input name="fullName" autoComplete="name" placeholder="Digite seu nome completo" required />
              </label>
              <label className="auth-labeled-field">
                <span>CPF</span>
                <input name="cpf" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" required />
              </label>
              <div className="auth-field-row">
                <label className="auth-labeled-field">
                  <span>Data de nascimento</span>
                  <input type="date" name="birthDate" autoComplete="bday" required />
                </label>
                <label className="auth-labeled-field">
                  <span>Gênero <small>(opcional)</small></span>
                  <select name="gender" defaultValue="">
                    <option value="">Prefiro não informar</option>
                    <option value="woman">Mulher</option>
                    <option value="man">Homem</option>
                    <option value="nonbinary">Não binário</option>
                    <option value="other">Outro</option>
                  </select>
                </label>
              </div>
            </>
          ) : (
            <>
              <label className="auth-labeled-field">
                <span>Nome da ONG ou entidade</span>
                <input name="organizationName" autoComplete="organization" placeholder="Digite o nome da instituição" required />
              </label>
              <label className="auth-labeled-field">
                <span>CNPJ</span>
                <input name="cnpj" inputMode="numeric" autoComplete="off" placeholder="00.000.000/0000-00" required />
              </label>
              <label className="auth-labeled-field">
                <span>Nome da pessoa responsável</span>
                <input name="contactName" autoComplete="name" placeholder="Quem representa a instituição?" required />
              </label>
            </>
          )}

          <label className="auth-labeled-field">
            <span>E-mail</span>
            <input type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" required />
          </label>
          <div className="auth-field-row">
            <label className="auth-labeled-field">
              <span>Celular</span>
              <input type="tel" name="mobile" autoComplete="tel" placeholder="(00) 00000-0000" required />
            </label>
            <label className="auth-labeled-field">
              <span>Telefone <small>(opcional)</small></span>
              <input type="tel" name="phone" placeholder="(00) 0000-0000" />
            </label>
          </div>

          <div className="auth-field-row password-row">
            <label className="auth-labeled-field">
              <span>Senha</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                autoComplete="new-password"
                placeholder="Crie uma senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                title="Use ao menos 8 caracteres, com letra maiúscula, minúscula e número."
                required
              />
            </label>
            <label className="auth-labeled-field">
              <span>Confirmar senha</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Repita sua senha"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
          </div>
          <button type="button" className="password-toggle registration-password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Ocultar senhas' : 'Mostrar senhas'}
          </button>

          <div className="password-requirements" aria-live="polite">
            <strong>Requisitos da senha</strong>
            <ul>
              {passwordChecks.map((check) => (
                <li className={check.valid ? 'requirement-met' : ''} key={check.label}>{check.label}</li>
              ))}
            </ul>
          </div>

          {error && <p className="auth-form-error" role="alert">{error}</p>}

          <label className="terms-check">
            <input type="checkbox" name="terms" required />
            <span>Li e concordo com os termos de uso e a política de privacidade.</span>
          </label>

          <button className="auth-submit" type="submit">Criar conta</button>
        </form>

        <p className="auth-switch-copy">
          Já tem uma conta?{' '}
          <Link className="auth-text-button" to="/entrar">Voltar para entrar</Link>
        </p>
        <p className="auth-demo-note">Protótipo demonstrativo: os dados não são enviados nem armazenados.</p>
      </main>
    </div>
  );
}
