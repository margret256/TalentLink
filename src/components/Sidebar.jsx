import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileCheck2,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  X,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/my-projects', label: 'My Projects', icon: Briefcase },
  { to: '/applications', label: 'My Applications', icon: FileCheck2 },
  { to: '/saved-jobs', label: 'Saved Jobs', icon: Bookmark, badge: 3 },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/notifications', label: 'Notifications', icon: Bell, badge: 6 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy text-white flex flex-col z-50 transition-transform duration-200 shrink-0
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg btn-gradient flex items-center justify-center font-bold text-sm">S</div>
            <span className="font-bold text-lg">SkillBridge</span>
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
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-ring ${
                  isActive ? 'btn-gradient text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-white/20 rounded-full px-1.5 py-0.5">{item.badge}</span>
              )}
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
