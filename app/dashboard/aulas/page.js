'use client'

import { useApp } from '@/components/AppContext'
import { useState } from 'react'

function getEmbedUrl(url) {
  if (!url) return null
  // YouTube: youtube.com/watch?v=ID or youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
  if (ytMatch) return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0` }
  // Vimeo: vimeo.com/ID
  const vmMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vmMatch) return { type: 'iframe', src: `https://player.vimeo.com/video/${vmMatch[1]}` }
  // Google Drive: drive.google.com/file/d/ID/view
  const gdMatch = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)
  if (gdMatch) return { type: 'iframe', src: `https://drive.google.com/file/d/${gdMatch[1]}/preview` }
  // Direct video file
  return { type: 'video', src: url }
}

export default function AulasPage() {
  const { tutorials, loading } = useApp()
  const [expandedId, setExpandedId] = useState(null)

  if (loading) {
    return (
      <div className="content-pad">
        <div className="page-header">
          <p className="eyebrow">Biblioteca</p>
          <h1 className="page-title">Suas aulas</h1>
        </div>
        <div className="aulas-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-block card" style={{ height: 180 }}></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Biblioteca</p>
          <h1 className="page-title">Suas aulas</h1>
          <p className="page-subtitle">Tutoriais em vídeo gravados especificamente para seu projeto.</p>
        </div>
      </div>

      {tutorials.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <h3>Nenhuma aula disponível</h3>
          <p>As aulas do seu projeto aparecerão aqui quando forem publicadas.</p>
        </div>
      ) : (
        <div className="aulas-grid">
          {tutorials.map((tutorial, idx) => {
            const embed = getEmbedUrl(tutorial.video_url)
            return (
              <div
                key={tutorial.id}
                className={`aula-card ${expandedId === tutorial.id ? 'expanded' : ''}`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <button
                  className="aula-card-header"
                  onClick={() => setExpandedId(expandedId === tutorial.id ? null : tutorial.id)}
                >
                  <div className="aula-number">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="aula-info">
                    <h3>{tutorial.title}</h3>
                    <div className="aula-meta">
                      {tutorial.duration && <span className="aula-tag">{tutorial.duration}</span>}
                      {tutorial.category && <span className="aula-tag">{tutorial.category}</span>}
                    </div>
                  </div>
                  <svg className="aula-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                <div className="aula-expand">
                  <div className="aula-expand-inner">
                    {tutorial.description && (
                      <p className="aula-description">{tutorial.description}</p>
                    )}
                    {embed ? (
                      <div className="aula-player">
                        {embed.type === 'iframe' ? (
                          <iframe
                            src={embed.src}
                            className="aula-iframe"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            frameBorder="0"
                          />
                        ) : (
                          <video
                            src={embed.src}
                            controls
                            className="aula-video"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="aula-player-empty">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                        <span>Vídeo será disponibilizado em breve</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
