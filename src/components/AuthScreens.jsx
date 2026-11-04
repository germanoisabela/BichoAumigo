import { useState } from 'react';

function AuthBrand() {
  return (
    <a className="auth-brand" href="#login" aria-label="BichoAumigo">
      <span aria-hidden="true">🐾</span> BichoAumigo
    </a>
  );
}

function AuthTopbar() {
  return (
    <header className="auth-topbar">
      <AuthBrand />
      <span className="secure-label"><span aria-hidden="true">♙</span> Ambiente<br />seguro</span>
    </header>
  );
}

export function LoginScreen({ onRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(accountType);
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
              <input type="radio" name="loginAccountType" value="individual" checked={accountType === 'individual'} onChange={() => setAccountType('individual')} />
              <span>Pessoa</span>
            </label>
            <label>
              <input type="radio" name="loginAccountType" value="entity" checked={accountType === 'entity'} onChange={() => setAccountType('entity')} />
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
          <button type="button" className="auth-text-button" onClick={onRegister}>Criar conta</button>
        </p>
        <p className="auth-legal-copy">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
        <p className="auth-demo-note">Protótipo demonstrativo: o login ainda não verifica nem armazena credenciais.</p>
      </main>
    </div>
  );
}

export function RegistrationScreen({ onBackToLogin, onRegister }) {
  const [accountType, setAccountType] = useState('individual');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordChecks = [
    { label: 'Mínimo de 8 caracteres', valid: password.length >= 8 },
    { label: 'Letra minúscula', valid: /[a-z]/.test(password) },
    { label: 'Número', valid: /\d/.test(password) },
    { label: 'Letra maiúscula', valid: /[A-Z]/.test(password) },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Confira os dois campos.');
      return;
    }
    setError('');
    const formData = new FormData(event.currentTarget);
    const isOrganization = accountType === 'entity';
    const phoneDigits = String(formData.get('mobile') ?? '').replace(/\D/g, '');
    const whatsappNumber = phoneDigits && !phoneDigits.startsWith('55') ? `55${phoneDigits}` : phoneDigits;

    onRegister({
      id: `demo-${Date.now()}`,
      type: isOrganization ? 'organization' : 'user',
      name: String(formData.get(isOrganization ? 'organizationName' : 'fullName')),
      description: isOrganization ? 'Organização de proteção animal' : 'Pessoa da comunidade BichoAumigo',
      location: 'Localização não informada',
      image: isOrganization
        ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
      about: 'Este perfil foi criado nesta demonstração. Complete as informações para apresentar sua história e os animais sob seus cuidados.',
      whatsappNumber,
    });
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
              <input type="radio" name="accountType" value="individual" checked={accountType === 'individual'} onChange={() => setAccountType('individual')} />
              <span>Pessoa física</span>
            </label>
            <label>
              <input type="radio" name="accountType" value="entity" checked={accountType === 'entity'} onChange={() => setAccountType('entity')} />
              <span>ONG ou entidade</span>
            </label>
          </fieldset>

          {accountType === 'individual' ? (
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
          <button type="button" className="auth-text-button" onClick={onBackToLogin}>Voltar para entrar</button>
        </p>
        <p className="auth-demo-note">Protótipo demonstrativo: os dados não são enviados nem armazenados.</p>
      </main>
    </div>
  );
}