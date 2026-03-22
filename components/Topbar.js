'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useApp } from './AppContext'

export default function Topbar() {
  const router = useRouter()
  const supabase = createClient()
  const { profile, selectedClient, toggleMobileNav } = useApp()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  const displayName = profile?.display_name || 'Usuário'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className="topbar">
      <div className="topbar-copy">
        <button
          className="mobile-menu-button"
          onClick={toggleMobileNav}
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div>
          <p className="topbar-project">{selectedClient?.name || 'Portal'}</p>
          <h2 className="topbar-greeting">Olá, {displayName}</h2>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="user-session">
          <div className="user-avatar">{initial}</div>
          <div className="user-info">
            <strong>{displayName}</strong>
          </div>
          <button
            className="logout-button"
            title="Sair"
            onClick={handleLogout}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6.5 2H4a2 2 0 00-2 2v10a2 2 0 002 2h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M12 12.5l3.5-3.5L12 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="9" x2="15.5" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
