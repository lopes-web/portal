'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'

export default function MobileDock() {
  const pathname = usePathname()
  const { isAdmin } = useApp()

  const items = [
    { target: '/dashboard', label: 'Home', icon: 'M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z' },
    { target: '/dashboard/aulas', label: 'Aulas', icon: 'M4 4h16v12H4zM8 20h8M12 16v4' },
    { target: '/dashboard/acessos', label: 'Acessos', icon: 'M12 2a4 4 0 00-4 4v4h8V6a4 4 0 00-4-4zM5 10h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1z' },
  ]

  if (isAdmin) {
    items.push({
      target: '/dashboard/admin',
      label: 'Admin',
      icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
    })
  }

  return (
    <nav className="mobile-dock" aria-label="Atalhos principais">
      {items.map((item) => (
        <Link
          key={item.target}
          href={item.target}
          className={`mobile-dock-link ${pathname === item.target ? 'active' : ''}`}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon} />
          </svg>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
