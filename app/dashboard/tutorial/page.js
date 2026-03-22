'use client'

import { useApp } from '@/components/AppContext'

export default function TutorialPage() {
  const { selectedClient, activeTutorial, setActiveLessonId } = useApp()

  if (!selectedClient) return null

  const tutorials = selectedClient.tutorials || []

  return (
    <div className="content-pad split-layout">
      <div className="main-col">
        {activeTutorial ? (
          <>
            <div className="video-container">
              {activeTutorial.videoUrl ? (
                <iframe
                  src={activeTutorial.videoUrl}
                  title="Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="video-placeholder">
                  <div className="play-icon" aria-hidden="true"></div>
                  <span>Video em processamento ou nao cadastrado</span>
                </div>
              )}
            </div>

            <div className="lesson-info">
              <div className="lesson-header">
                <span className="lesson-badge">{activeTutorial.category}</span>
                <span className="lesson-duration">{activeTutorial.duration}</span>
              </div>
              <h1 className="lesson-title">{activeTutorial.title}</h1>
              <p className="lesson-desc">{activeTutorial.description}</p>
              <div className="lesson-actions">
                <button className="primary-button">Marcar como concluida</button>
                <button className="secondary-button" disabled>Baixar material</button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            Selecione uma aula na biblioteca lateral para começar.
          </div>
        )}
      </div>

      <aside className="side-col">
        <div className="module-list">
          <div className="module-header">
            <h3>Conteudo do modulo</h3>
            <span className="module-progress">
              {tutorials.filter(t => t.status === 'Concluido').length}/{tutorials.length} aulas
            </span>
          </div>
          
          <div className="lesson-items">
            {tutorials.map((lesson, idx) => (
              <button 
                key={lesson.id}
                className={`lesson-item ${activeTutorial?.id === lesson.id ? 'active' : ''} ${lesson.status === 'Concluido' ? 'completed' : ''}`}
                onClick={() => setActiveLessonId(lesson.id)}
              >
                <span className="lesson-number">{String(idx + 1).padStart(2, '0')}</span>
                <div className="lesson-item-info">
                  <strong>{lesson.title}</strong>
                  <span>{lesson.duration}</span>
                </div>
                {lesson.status === 'Concluido' && (
                  <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="var(--positive)"/>
                    <path d="M4.5 8L7 10.5L11.5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
