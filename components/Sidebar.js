'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'

export default function Sidebar() {
  const pathname = usePathname()
  const { selectedClient, isAdmin, clients, setSelectedClientId, tutorials } = useApp()

  // Client sees minimal nav, admin sees full nav
  const clientNav = [
    { target: '/dashboard', label: 'Home', icon: 'M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z' },
    { target: '/dashboard/aulas', label: 'Aulas', icon: 'M4 4h16v12H4zM8 20h8M12 16v4' },
    { target: '/dashboard/acessos', label: 'Acessos', icon: 'M12 2a4 4 0 00-4 4v4h8V6a4 4 0 00-4-4zM5 10h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1z' },
  ]

  const adminNav = [
    ...clientNav,
    { target: '/dashboard/admin', label: 'Admin', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z' },
  ]

  const navItems = isAdmin ? adminNav : clientNav

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <span className="brand-mark">P</span>
        <div>
          <p className="eyebrow">Portal do cliente</p>
          <h1>Portal</h1>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Menu principal">
        {navItems.map((item) => (
          <Link
            key={item.target}
            href={item.target}
            className={`nav-link ${pathname === item.target ? 'active' : ''}`}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            {item.label}
          </Link>
        ))}
      </nav>

      {selectedClient && (
        <div className="sidebar-card">
          <p className="eyebrow">Projeto ativo</p>
          <h2>{selectedClient.name}</h2>
          <div className="sidebar-stat-row">
            <div className="sidebar-stat">
              <span className="stat-number">{tutorials.length}</span>
              <span className="stat-label">aulas</span>
            </div>
          </div>
        </div>
      )}

      {isAdmin && clients?.length > 0 && (
        <div className="sidebar-card compact">
          <p className="eyebrow">Trocar cliente</p>
          <div className="client-list">
            {clients.map(client => (
              <button
                key={client.id}
                className={`client-chip ${client.id === selectedClient?.id ? 'active' : ''}`}
                onClick={() => setSelectedClientId(client.id)}
              >
                <span>{client.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
