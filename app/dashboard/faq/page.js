'use client'

import { useApp } from '@/components/AppContext'
import { useState } from 'react'

export default function FAQPage() {
  const { selectedClient } = useApp()
  const [openIndex, setOpenIndex] = useState(null)

  if (!selectedClient) return null

  const faq = selectedClient.faq || []

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Ajuda Rápida</p>
          <h1 className="page-title">Perguntas frequentes</h1>
          <p className="page-subtitle">Principais dúvidas sobre a operação do portal.</p>
        </div>
      </div>

      {faq.length === 0 ? (
        <div className="empty-state">
          Nenhuma pergunta cadastrada.
        </div>
      ) : (
        <div className="faq-list">
          {faq.map((item, idx) => (
            <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
              <button 
                className="faq-question" 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{item.question}</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <span className="faq-category">{item.category}</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
