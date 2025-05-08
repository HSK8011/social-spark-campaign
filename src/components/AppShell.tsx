import { Outlet } from 'react-router-dom'
import { Sidebar } from './ui/sidebar'

const AppShell = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell