import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Share2,
  Send,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/connect', icon: Share2, label: 'Connect' },
  { to: '/publish', icon: Send, label: 'Publish' },
  { to: '/engage', icon: MessageSquare, label: 'Engage' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-card px-3 py-4">
      <div className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              )
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
      <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  )
}
