'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import './login.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showShake, setShowShake] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  const getErrorMessage = (error) => {
    const msg = error?.message?.toLowerCase() || ""
    if (msg.includes("invalid") || msg.includes("credentials")) {
      return "E-mail ou senha incorretos. Verifique e tente novamente."
    }
    if (msg.includes("rate") || msg.includes("limit")) {
      return "Muitas tentativas. Aguarde um momento antes de tentar novamente."
    }
    if (msg.includes("network") || msg.includes("fetch")) {
      return "Erro de conexao. Verifique sua internet e tente novamente."
    }
    return "Erro ao fazer login. Tente novamente."
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(getErrorMessage(error))
      setIsLoading(false)
      setShowShake(true)
      setTimeout(() => setShowShake(false), 500)
      return
    }

    // Success — router.push will trigger middleware which redirect to dashboard
    router.push('/dashboard')
    // Router push in Next.js App Router might not show immediate loading if the route is server side
    // So keep isLoading true just to disable the button
  }

  return (
    <>
      {/* Animated background orbs */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Subtle grid overlay */}
      <div className="grid-overlay" aria-hidden="true"></div>

      <main className="login-stage">
        <div className="login-card visible">
          {/* Brand header */}
          <div className="login-brand">
            <span className="brand-mark">P</span>
            <div>
              <p className="eyebrow">Portal do cliente</p>
              <h1>Portal</h1>
            </div>
          </div>

          {/* Welcome text */}
          <div className="login-welcome">
            <h2>Bem-vindo de volta</h2>
            <p>Acesse seu portal privado com tutoriais, recursos e acessos do projeto.</p>
          </div>

          {/* Error message */}
          <div className={`login-error ${errorMsg ? '' : 'hidden'}`}>
            <div className="error-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="9" y1="5.5" x2="9" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="9" cy="12.5" r="0.75" fill="currentColor"/>
              </svg>
            </div>
            <span>{errorMsg || 'Credenciais invalidas.'}</span>
          </div>

          {/* Login form */}
          <form 
            className={`login-form ${showShake ? 'shake' : ''}`} 
            onSubmit={handleLogin}
            action="#"
            autoComplete="on"
          >
            <label className="form-field">
              <span className="field-label">E-mail</span>
              <div className="input-shell">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M2 6l7 4.5L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </label>

            <label className="form-field">
              <span className="field-label">Senha</span>
              <div className="input-shell">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="3" y="8" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M6 8V5.5a3 3 0 016 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="9" cy="12" r="1" fill="currentColor"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className={`toggle-password ${showPassword ? 'active' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 9s3-5.5 7.5-5.5S16.5 9 16.5 9s-3 5.5-7.5 5.5S1.5 9 1.5 9z" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                </button>
              </div>
            </label>

            <button type="submit" className="login-button" disabled={isLoading}>
              <span className="button-text">{isLoading ? 'Entrando...' : 'Entrar'}</span>
              <span className={`button-loader ${isLoading ? '' : 'hidden'}`}>
                <span className="spinner"></span>
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>Acesso exclusivo para clientes autorizados.</p>
          </div>
        </div>

        {/* Decorative side panel */}
        <aside className="login-aside" aria-hidden="true">
          <div className="aside-content">
            <div className="aside-badge">
              <span className="aside-badge-dot"></span>
              <span>Portal ativo</span>
            </div>
            <h3>Tutoriais sob medida para cada projeto</h3>
            <p>Dashboard personalizado, biblioteca de videos, cofre de acessos e suporte dedicado — tudo num so lugar.</p>
            <div className="aside-stats">
              <div className="aside-stat">
                <strong>100%</strong>
                <span>Privado</span>
              </div>
              <div className="aside-stat">
                <strong>24/7</strong>
                <span>Disponivel</span>
              </div>
              <div className="aside-stat">
                <strong>HD</strong>
                <span>Video</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  )
}
