import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'

export default function SimplePage({ title, subtitle, icon: Icon, emptyText }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <div className="bg-white rounded-2xl border border-border shadow-card p-16 flex flex-col items-center text-center">
          {Icon && (
            <div className="h-14 w-14 rounded-2xl bg-lightpurple text-primary flex items-center justify-center mb-4">
              <Icon size={26} />
            </div>
          )}
          <p className="text-sm text-subtext max-w-sm">{emptyText}</p>
        </div>
      </div>
    </div>
  )
}
