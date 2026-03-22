'use client'

import { useApp } from '@/components/AppContext'
import { useState } from 'react'

export default function AcessosPage() {
  const { accesses, loading } = useApp()
  const [copiedId, setCopiedId] = useState(null)
  const [visiblePasswords, setVisiblePasswords] = useState({})

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const togglePassword = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'wordpress':
        return 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM3.5 12c0-1.7.5-3.3 1.4-4.7L9 19.2C5.8 17.9 3.5 15.2 3.5 12zm8.5 8.5c-.9 0-1.7-.1-2.5-.4l2.7-7.8 2.7 7.5c0 .1.1.1.1.2-.9.3-1.9.5-3 .5zm1.2-12.5c.5 0 1-.1 1-.1.5-.1.4-.7 0-.7 0 0-1.4.1-2.4.1-.9 0-2.3-.1-2.3-.1-.5 0-.5.7-.1.7 0 0 .5.1.9.1l1.4 3.8-2 5.9L7 8.1c.5 0 1-.1 1-.1.5-.1.4-.7 0-.7 0 0-1.4.1-2.3.1h-.6C6.6 5.1 9.1 3.5 12 3.5c2.2 0 4.1.8 5.6 2.2h-.1c-.8 0-1.4.7-1.4 1.5 0 .7.4 1.3.8 2 .3.5.7 1.2.7 2.1 0 .6-.2 1.4-.6 2.4l-.8 2.6-2.8-8.3z'
      case 'hosting':
        return 'M2 5a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zM2 13a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zM6 6h.01M6 14h.01'
      case 'dominio':
        return 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
      default:
        return 'M15 7h3a5 5 0 010 10h-3m-6 0H6A5 5 0 016 7h3M8 12h8'
    }
  }

  if (loading) {
    return (
      <div className="content-pad">
        <div className="page-header">
          <p className="eyebrow">Cofre</p>
          <h1 className="page-title">Seus acessos</h1>
        </div>
        <div className="acessos-grid">
          {[1, 2].map(i => (
            <div key={i} className="skeleton-block card" style={{ height: 220 }}></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Cofre</p>
          <h1 className="page-title">Seus acessos</h1>
          <p className="page-subtitle">Credenciais seguras do seu projeto. Nunca compartilhe essas informações.</p>
        </div>
      </div>

      {accesses.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h3>Nenhum acesso cadastrado</h3>
          <p>As credenciais do seu projeto aparecerão aqui quando forem configuradas.</p>
        </div>
      ) : (
        <div className="acessos-grid">
          {accesses.map((access, idx) => (
            <div
              key={access.id}
              className="acesso-card"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="acesso-header">
                <div className="acesso-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={getTypeIcon(access.type)} />
                  </svg>
                </div>
                <div>
                  <h3>{access.label}</h3>
                  {access.type && <span className="acesso-type">{access.type}</span>}
                </div>
              </div>

              <div className="acesso-fields">
                {access.url && (
                  <div className="acesso-field">
                    <span className="acesso-field-label">URL</span>
                    <a href={access.url} target="_blank" rel="noopener noreferrer" className="acesso-link">
                      {access.url.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}

                <div className="acesso-field">
                  <span className="acesso-field-label">Usuário</span>
                  <div className="acesso-value-row">
                    <code>{access.username}</code>
                    <button
                      className={`copy-btn ${copiedId === `${access.id}-user` ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(access.username, `${access.id}-user`)}
                      title="Copiar"
                    >
                      {copiedId === `${access.id}-user` ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="acesso-field">
                  <span className="acesso-field-label">Senha</span>
                  <div className="acesso-value-row">
                    <code className={visiblePasswords[access.id] ? '' : 'obfuscated'}>
                      {visiblePasswords[access.id] ? access.password : '••••••••••'}
                    </code>
                    <div className="acesso-actions">
                      <button
                        className="toggle-btn"
                        onClick={() => togglePassword(access.id)}
                        title={visiblePasswords[access.id] ? 'Ocultar' : 'Mostrar'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {visiblePasswords[access.id] ? (
                            <>
                              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                            </>
                          ) : (
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </>
                          )}
                        </svg>
                      </button>
                      <button
                        className={`copy-btn ${copiedId === `${access.id}-pass` ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(access.password, `${access.id}-pass`)}
                        title="Copiar"
                      >
                        {copiedId === `${access.id}-pass` ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {access.notes && (
                <div className="acesso-notes">
                  <p>{access.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
