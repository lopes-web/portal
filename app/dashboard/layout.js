import { createClient } from '@/lib/supabase/server'
import { AppProvider } from '@/components/AppContext'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import MobileDock from '@/components/MobileDock'

export const metadata = {
  title: 'Dashboard — Portal',
}

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()

  // Middleware ensured we have a user
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <AppProvider initialProfile={profile || { id: user.id, role: 'client' }}>
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Topbar />
          {children}
        </main>
        <MobileDock />
      </div>
    </AppProvider>
  )
}
