import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileCheck2,
  FolderKanban,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/opportunities', label: 'Opportunities', icon: Briefcase },
  { to: '/admin/applications', label: 'Applications', icon: FileCheck2 },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy text-white flex flex-col z-50 transition-transform duration-200 shrink-0
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg btn-gradient flex items-center justify-center font-bold text-sm">S</div>
            <div>
              <span className="font-bold text-lg leading-none block">SkillBridge</span>
              <span className="text-[10px] text-white/50 flex items-center gap-1">
                <ShieldCheck size={10} /> Admin
              </span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-ring ${
                  isActive ? 'btn-gradient text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-6">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white focus-ring"
          >
            <LogOut size={18} />
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  )
}
