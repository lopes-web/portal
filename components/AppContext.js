'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

const AppContext = createContext()

export function AppProvider({ children, initialProfile }) {
  const [profile, setProfile] = useState(initialProfile)
  const [clients, setClients] = useState([])
  const [selectedClientId, setSelectedClientId] = useState(null)
  const [tutorials, setTutorials] = useState([])
  const [accesses, setAccesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const supabase = createClient()
  const isAdmin = profile?.role === 'admin'
  const openMobileNav = useCallback(() => setIsMobileNavOpen(true), [])
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), [])
  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(current => !current)
  }, [])

  // Fetch clients list (admin: all, client: only theirs)
  const fetchClients = useCallback(async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: true })

    if (data) {
      setClients(data)
      // Auto-select first client or the one linked to profile
      if (!selectedClientId) {
        const linked = data.find(c => c.id === profile?.client_ref)
        setSelectedClientId(linked?.id || data[0]?.id || null)
      }
    }
  }, [profile, selectedClientId, supabase])

  // Fetch tutorials for selected client
  const fetchTutorials = useCallback(async (clientId) => {
    if (!clientId) return
    const { data } = await supabase
      .from('tutorials')
      .select('*')
      .eq('client_id', clientId)
      .order('sort_order', { ascending: true })

    setTutorials(data || [])
  }, [supabase])

  // Fetch accesses for selected client
  const fetchAccesses = useCallback(async (clientId) => {
    if (!clientId) return
    const { data } = await supabase
      .from('accesses')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: true })

    setAccesses(data || [])
  }, [supabase])

  // Initial load
  useEffect(() => {
    fetchClients().then(() => setLoading(false))
  }, [fetchClients])

  // Reload data when selected client changes
  useEffect(() => {
    if (selectedClientId) {
      fetchTutorials(selectedClientId)
      fetchAccesses(selectedClientId)
    }
  }, [selectedClientId, fetchTutorials, fetchAccesses])

  const selectedClient = clients.find(c => c.id === selectedClientId) || null

  const value = {
    profile,
    isAdmin,
    clients,
    selectedClient,
    selectedClientId,
    setSelectedClientId,
    tutorials,
    accesses,
    loading,
    isMobileNavOpen,
    openMobileNav,
    closeMobileNav,
    toggleMobileNav,
    refresh: () => {
      fetchClients()
      if (selectedClientId) {
        fetchTutorials(selectedClientId)
        fetchAccesses(selectedClientId)
      }
    }
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
