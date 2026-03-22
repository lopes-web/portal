'use client'

import { useApp } from '@/components/AppContext'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminPage() {
  const { isAdmin, clients, selectedClient, selectedClientId, refresh } = useApp()
  const supabase = createClient()

  // Client creation
  const [clientName, setClientName] = useState('')
  const [clientSlug, setClientSlug] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPassword, setClientPassword] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [status, setStatus] = useState({ type: '', msg: '' })

  // Tutorial creation
  const [tutTitle, setTutTitle] = useState('')
  const [tutDesc, setTutDesc] = useState('')
  const [tutDuration, setTutDuration] = useState('')
  const [tutCategory, setTutCategory] = useState('')
  const [tutVideoFile, setTutVideoFile] = useState(null)
  const [tutVideoUrl, setTutVideoUrl] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSavingTut, setIsSavingTut] = useState(false)
  const [tutStatus, setTutStatus] = useState({ type: '', msg: '' })

  // Access creation
  const [accLabel, setAccLabel] = useState('')
  const [accType, setAccType] = useState('')
  const [accUrl, setAccUrl] = useState('')
  const [accUsername, setAccUsername] = useState('')
  const [accPassword, setAccPassword] = useState('')
  const [accNotes, setAccNotes] = useState('')
  const [isSavingAcc, setIsSavingAcc] = useState(false)
  const [accStatus, setAccStatus] = useState({ type: '', msg: '' })

  if (!isAdmin) {
    return (
      <div className="content-pad">
        <div className="empty-state-card">
          <h3>Acesso restrito</h3>
          <p>Este painel é exclusivo para administradores.</p>
        </div>
      </div>
    )
  }

  const handleCreateClient = async (e) => {
    e.preventDefault()
    setIsCreating(true)
    setStatus({ type: '', msg: '' })
    try {
      const slug = clientSlug || clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

      // Create client in DB
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert({ name: clientName, slug })
        .select()
        .single()

      if (clientError) throw new Error(clientError.message)

      // Create auth user via Edge Function
      if (clientEmail && clientPassword) {
        const { data: result, error: fnError } = await supabase.functions.invoke('create-user', {
          body: {
            email: clientEmail,
            password: clientPassword,
            role: 'client',
            client_id: slug,
            display_name: clientName
          }
        })

        if (fnError) {
          // Try to extract the real error from the response body
          let errMsg = fnError.message
          try {
            const ctx = fnError.context
            if (ctx && typeof ctx.json === 'function') {
              const body = await ctx.json()
              errMsg = body?.error || errMsg
            }
          } catch {}
          throw new Error(errMsg)
        }
        if (result?.error) throw new Error(result.error)

        // Link profile to client
        if (result?.user?.id) {
          await supabase
            .from('profiles')
            .update({ client_ref: newClient.id })
            .eq('id', result.user.id)
        }
      }

      setStatus({ type: 'success', msg: `Cliente "${clientName}" criado com sucesso!` })
      setClientName(''); setClientSlug(''); setClientEmail(''); setClientPassword('')
      refresh()
    } catch (err) {
      setStatus({ type: 'error', msg: err.message })
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateTutorial = async (e) => {
    e.preventDefault()
    setIsSavingTut(true)
    setTutStatus({ type: '', msg: '' })
    setUploadProgress(0)
    try {
      if (!selectedClientId) throw new Error('Selecione um cliente primeiro.')

      let videoUrl = tutVideoUrl || null

      // Upload video file if selected (max 50MB on free plan)
      if (tutVideoFile && !tutVideoUrl) {
        if (tutVideoFile.size > 50 * 1024 * 1024) {
          throw new Error('Arquivo excede 50MB. Use a opção de URL externa para vídeos grandes.')
        }
        setTutStatus({ type: '', msg: 'Enviando vídeo...' })
        const fileExt = tutVideoFile.name.split('.').pop()
        const fileName = `${selectedClientId}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('tutorials')
          .upload(fileName, tutVideoFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw new Error('Erro no upload: ' + uploadError.message)

        const { data: urlData } = supabase.storage
          .from('tutorials')
          .getPublicUrl(fileName)

        videoUrl = urlData.publicUrl
      }

      const { error } = await supabase
        .from('tutorials')
        .insert({
          client_id: selectedClientId,
          title: tutTitle,
          description: tutDesc || null,
          duration: tutDuration || null,
          category: tutCategory || null,
          video_url: videoUrl
        })

      if (error) throw new Error(error.message)

      setTutStatus({ type: 'success', msg: `Aula "${tutTitle}" adicionada com sucesso!` })
      setTutTitle(''); setTutDesc(''); setTutDuration(''); setTutCategory(''); setTutVideoFile(null); setTutVideoUrl('')
      // Reset file input
      const fileInput = document.getElementById('video-upload')
      if (fileInput) fileInput.value = ''
      refresh()
    } catch (err) {
      setTutStatus({ type: 'error', msg: err.message })
    } finally {
      setIsSavingTut(false)
      setUploadProgress(0)
    }
  }

  const handleCreateAccess = async (e) => {
    e.preventDefault()
    setIsSavingAcc(true)
    setAccStatus({ type: '', msg: '' })
    try {
      if (!selectedClientId) throw new Error('Selecione um cliente primeiro.')

      const { error } = await supabase
        .from('accesses')
        .insert({
          client_id: selectedClientId,
          label: accLabel,
          type: accType || null,
          url: accUrl || null,
          username: accUsername || null,
          password: accPassword || null,
          notes: accNotes || null
        })

      if (error) throw new Error(error.message)

      setAccStatus({ type: 'success', msg: `Acesso "${accLabel}" adicionado!` })
      setAccLabel(''); setAccType(''); setAccUrl(''); setAccUsername(''); setAccPassword(''); setAccNotes('')
      refresh()
    } catch (err) {
      setAccStatus({ type: 'error', msg: err.message })
    } finally {
      setIsSavingAcc(false)
    }
  }

  return (
    <div className="content-pad">
      <div className="page-header">
        <div>
          <p className="eyebrow">Área restrita</p>
          <h1 className="page-title">Painel de Administração</h1>
          <p className="page-subtitle">
            Gerencie clientes, aulas e credenciais.
            {selectedClient && <> · Editando: <strong>{selectedClient.name}</strong></>}
          </p>
        </div>
      </div>

      <div className="admin-sections">
        {/* Create Client */}
        <div className="card">
          <div className="card-header"><h3>Novo Cliente</h3></div>
          <div className="card-body">
            <form className="admin-form" onSubmit={handleCreateClient}>
              <label className="form-field">
                <span className="field-label">Nome</span>
                <input type="text" required placeholder="Ex: Studio Aurora" value={clientName} onChange={e => setClientName(e.target.value)} />
              </label>
              <div className="form-divider"><span>Conta Supabase (opcional)</span></div>
              <div className="form-row">
                <label className="form-field">
                  <span className="field-label">E-mail</span>
                  <input type="email" placeholder="cliente@empresa.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
                </label>
                <label className="form-field">
                  <span className="field-label">Senha</span>
                  <input type="password" placeholder="Min 6 caracteres" value={clientPassword} onChange={e => setClientPassword(e.target.value)} />
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="primary-button" disabled={isCreating}>
                  {isCreating ? 'Criando...' : 'Criar cliente'}
                </button>
              </div>
              {status.msg && <div className={`admin-status ${status.type}`}>{status.msg}</div>}
            </form>
          </div>
        </div>

        {/* Add Tutorial */}
        <div className="card">
          <div className="card-header"><h3>Nova Aula — {selectedClient?.name || '...'}</h3></div>
          <div className="card-body">
            <form className="admin-form" onSubmit={handleCreateTutorial}>
              <label className="form-field">
                <span className="field-label">Título</span>
                <input type="text" required placeholder="Como editar o banner principal" value={tutTitle} onChange={e => setTutTitle(e.target.value)} />
              </label>
              <label className="form-field">
                <span className="field-label">Descrição</span>
                <textarea rows="2" placeholder="Breve descrição da aula..." value={tutDesc} onChange={e => setTutDesc(e.target.value)} />
              </label>
              <div className="form-row">
                <label className="form-field">
                  <span className="field-label">Duração</span>
                  <input type="text" placeholder="5 min" value={tutDuration} onChange={e => setTutDuration(e.target.value)} />
                </label>
                <label className="form-field">
                  <span className="field-label">Categoria</span>
                  <input type="text" placeholder="Conteúdo" value={tutCategory} onChange={e => setTutCategory(e.target.value)} />
                </label>
              </div>
              <div className="form-field">
                <span className="field-label">Vídeo da aula</span>
                <div className="video-options">
                  <div className="upload-zone">
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="upload-input"
                      onChange={e => { setTutVideoFile(e.target.files?.[0] || null); setTutVideoUrl('') }}
                    />
                    <div className="upload-label">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <span>{tutVideoFile ? tutVideoFile.name : 'Upload direto (max 50MB)'}</span>
                      {tutVideoFile && <small>{(tutVideoFile.size / 1024 / 1024).toFixed(1)} MB</small>}
                    </div>
                    {isSavingTut && uploadProgress > 0 && (
                      <div className="upload-progress">
                        <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    )}
                  </div>
                  <div className="video-or"><span>ou</span></div>
                  <label className="form-field compact">
                    <input
                      type="url"
                      placeholder="Cole a URL do vídeo (YouTube, Vimeo, Drive...)"
                      value={tutVideoUrl}
                      onChange={e => { setTutVideoUrl(e.target.value); setTutVideoFile(null) }}
                    />
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="primary-button" disabled={isSavingTut}>
                  {isSavingTut ? 'Salvando...' : 'Adicionar aula'}
                </button>
              </div>
              {tutStatus.msg && <div className={`admin-status ${tutStatus.type}`}>{tutStatus.msg}</div>}
            </form>
          </div>
        </div>

        {/* Add Access */}
        <div className="card">
          <div className="card-header"><h3>Novo Acesso — {selectedClient?.name || '...'}</h3></div>
          <div className="card-body">
            <form className="admin-form" onSubmit={handleCreateAccess}>
              <div className="form-row">
                <label className="form-field">
                  <span className="field-label">Nome</span>
                  <input type="text" required placeholder="WordPress principal" value={accLabel} onChange={e => setAccLabel(e.target.value)} />
                </label>
                <label className="form-field">
                  <span className="field-label">Tipo</span>
                  <input type="text" placeholder="WordPress / Hosting / Domínio" value={accType} onChange={e => setAccType(e.target.value)} />
                </label>
              </div>
              <label className="form-field">
                <span className="field-label">URL</span>
                <input type="url" placeholder="https://..." value={accUrl} onChange={e => setAccUrl(e.target.value)} />
              </label>
              <div className="form-row">
                <label className="form-field">
                  <span className="field-label">Usuário</span>
                  <input type="text" placeholder="admin@site.com" value={accUsername} onChange={e => setAccUsername(e.target.value)} />
                </label>
                <label className="form-field">
                  <span className="field-label">Senha</span>
                  <input type="text" placeholder="Senha do acesso" value={accPassword} onChange={e => setAccPassword(e.target.value)} />
                </label>
              </div>
              <label className="form-field">
                <span className="field-label">Notas</span>
                <textarea rows="2" placeholder="Observações..." value={accNotes} onChange={e => setAccNotes(e.target.value)} />
              </label>
              <div className="form-actions">
                <button type="submit" className="primary-button" disabled={isSavingAcc}>
                  {isSavingAcc ? 'Salvando...' : 'Adicionar acesso'}
                </button>
              </div>
              {accStatus.msg && <div className={`admin-status ${accStatus.type}`}>{accStatus.msg}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
