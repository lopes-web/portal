'use client'

import { useApp } from '@/components/AppContext'

export default function ResourcesPage() {
  const { selectedClient } = useApp()

  if (!selectedClient) return null

  const resources = selectedClient.resources || []

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Recursos</p>
          <h1 className="page-title">Links uteis e entregaveis</h1>
          <p className="page-subtitle">Acesso direto aos arquivos finais e areas de suporte.</p>
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="empty-state">
          Nenhum recurso cadastrado.
        </div>
      ) : (
        <div className="resource-list">
          {resources.map((res, idx) => (
            <a key={idx} href={res.link} className="resource-item" target="_blank" rel="noopener noreferrer">
              <div className="resource-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2h-7l-2-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="resource-content">
                <h3>{res.label}</h3>
                <p>{res.body}</p>
              </div>
              <div className="resource-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
