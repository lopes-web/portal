'use client'

import { useApp } from '@/components/AppContext'
import { useState } from 'react'

export default function AccessPage() {
  const { selectedClient } = useApp()
  const [copiedId, setCopiedId] = useState(null)

  if (!selectedClient) return null

  const accesses = selectedClient.accesses || []

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Cofre de acessos</p>
          <h1 className="page-title">Credenciais do projeto</h1>
          <p className="page-subtitle">Senhas e logins em ambiente seguro. Nunca compartilhe essas informacoes.</p>
        </div>
      </div>

      {accesses.length === 0 ? (
        <div className="empty-state">
          Nenhum acesso cadastrado.
        </div>
      ) : (
        <div className="access-grid">
          {accesses.map(access => (
            <div key={access.id} className="access-card">
              <div className="access-header">
                <h3>{access.label}</h3>
                <span className="access-type">{access.type}</span>
              </div>
              
              <div className="access-field">
                <span className="field-label">URL de login</span>
                <div className="field-value">
                  <a href={access.url} target="_blank" rel="noopener noreferrer">{access.url}</a>
                </div>
              </div>

              <div className="access-field">
                <span className="field-label">Usuario / E-mail</span>
                <div className="field-value copyable">
                  <code>{access.username}</code>
                  <button 
                    className="icon-button" 
                    title="Copiar"
                    onClick={() => copyToClipboard(access.username, `${access.id}-user`)}
                  >
                    {copiedId === `${access.id}-user` ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5l-7 7L3 8" stroke="var(--positive)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10.5 5.5v-2a1.5 1.5 0 00-1.5-1.5h-5A1.5 1.5 0 002.5 3.5v5A1.5 1.5 0 004 10h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="access-field">
                <span className="field-label">Senha</span>
                <div className="field-value copyable">
                  <code className="obfuscated">••••••••••••</code>
                  <button 
                    className="icon-button" 
                    title="Copiar senha"
                    onClick={() => copyToClipboard(access.password, `${access.id}-pass`)}
                  >
                    {copiedId === `${access.id}-pass` ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5l-7 7L3 8" stroke="var(--positive)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10.5 5.5v-2a1.5 1.5 0 00-1.5-1.5h-5A1.5 1.5 0 002.5 3.5v5A1.5 1.5 0 004 10h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {access.notes && (
                <div className="access-notes">
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
