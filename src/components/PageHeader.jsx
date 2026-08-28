import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, MessageSquare, Menu } from 'lucide-react'
import { userApi } from '../api/userApi'

export default function PageHeader({ title, subtitle, onMenuClick }) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const role = localStorage.getItem('talentlink_user_role') || 'candidate'
    userApi.getNotifications(role)
      .then((notifications) => setUnreadCount(notifications.filter((notification) => notification.unread).length))
      .catch(() => setUnreadCount(0))
  }, [])

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-maintext focus-ring rounded-lg p-1.5 border border-border"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-maintext">{title}</h1>
          {subtitle && <p className="text-sm text-subtext mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtext" />
          <input
            type="text"
            placeholder="Search anything..."
            aria-label="Search"
            className="bg-bg border border-border rounded-xl pl-9 pr-4 py-2 text-sm w-56 focus-ring focus:bg-white"
          />
        </div>
        <Link to="/notifications" aria-label="Notifications" className="relative h-9 w-9 flex items-center justify-center rounded-xl border border-border text-subtext hover:text-primary focus-ring">
          <Bell size={17} />
          {unreadCount > 0 && <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 text-[10px] flex items-center justify-center bg-primary text-white rounded-full">{unreadCount}</span>}
        </Link>
        <button aria-label="Messages" className="relative h-9 w-9 flex items-center justify-center rounded-xl border border-border text-subtext hover:text-primary focus-ring">
          <MessageSquare size={17} />
        </button>
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Profile avatar"
          className="h-9 w-9 rounded-full object-cover border border-border"
        />
      </div>
    </div>
  )
}
