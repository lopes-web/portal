'use client'

import { useApp } from '@/components/AppContext'
import Link from 'next/link'

export default function DashboardHome() {
  const { profile, selectedClient, tutorials, accesses, loading } = useApp()

  if (loading) {
    return (
      <div className="content-pad">
        <div className="loading-skeleton">
          <div className="skeleton-block hero"></div>
          <div className="skeleton-row">
            <div className="skeleton-block card"></div>
            <div className="skeleton-block card"></div>
          </div>
        </div>
      </div>
    )
  }

  const displayName = profile?.display_name || 'Usuário'

  return (
    <div className="content-pad">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-glow" aria-hidden="true"></div>
        <p className="eyebrow">Seu portal privado</p>
        <h1 className="home-title">
          Bem-vindo, <span className="gradient-text">{displayName}</span>
        </h1>
        <p className="home-subtitle">
          Acesse seus tutoriais em vídeo e credenciais do projeto num só lugar.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="home-grid">
        <Link href="/dashboard/aulas" className="home-card home-card-aulas">
          <div className="home-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <div className="home-card-content">
            <h3>Aulas</h3>
            <p>Tutoriais em vídeo do seu projeto</p>
          </div>
          <div className="home-card-badge">
            <span className="badge-number">{tutorials.length}</span>
            <span className="badge-label">{tutorials.length === 1 ? 'aula' : 'aulas'}</span>
          </div>
          <div className="home-card-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </Link>

        <Link href="/dashboard/acessos" className="home-card home-card-acessos">
          <div className="home-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
              <circle cx="12" cy="16" r="1"/>
            </svg>
          </div>
          <div className="home-card-content">
            <h3>Acessos</h3>
            <p>Credenciais e senhas do projeto</p>
          </div>
          <div className="home-card-badge">
            <span className="badge-number">{accesses.length}</span>
            <span className="badge-label">{accesses.length === 1 ? 'acesso' : 'acessos'}</span>
          </div>
          <div className="home-card-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </Link>
      </div>

      {/* Project Info */}
      {selectedClient && (
        <div className="home-info">
          <div className="home-info-badge">
            <span className="pulse-dot"></span>
            Projeto ativo
          </div>
          <span className="home-info-name">{selectedClient.name}</span>
        </div>
      )}
    </div>
  )
}
