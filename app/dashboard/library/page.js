'use client'

import { useApp } from '@/components/AppContext'
import Link from 'next/link'

export default function LibraryPage() {
  const { selectedClient, setActiveLessonId } = useApp()

  if (!selectedClient) return null

  const tutorials = selectedClient.tutorials || []

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Biblioteca</p>
          <h1 className="page-title">Trilhas de aprendizado</h1>
          <p className="page-subtitle">Acesso rapido a todos os conteudos em video organizados por categoria.</p>
        </div>
      </div>

      {tutorials.length === 0 ? (
        <div className="empty-state">
          Nenhum tutorial cadastrado.
        </div>
      ) : (
        <div className="module-grid">
          {tutorials.map(tutorial => (
            <div key={tutorial.id} className="module-card">
              <div className="module-status">
                <span className={`status-dot ${tutorial.status === 'Concluido' ? 'completed' : 'pending'}`}></span>
                <span className="status-label">{tutorial.status}</span>
              </div>
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
              <div className="module-meta">
                <span>{tutorial.duration}</span>
                <span>•</span>
                <span>{tutorial.category}</span>
              </div>
              <div className="module-actions">
                <Link 
                  href="/dashboard/tutorial" 
                  className="secondary-button"
                  onClick={() => setActiveLessonId(tutorial.id)}
                >
                  Assistir aula
                </Link>
                {tutorial.progress > 0 && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${tutorial.progress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
