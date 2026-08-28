import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import PageHeader from '../components/PageHeader'

export default function AdminPage({ title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <div className="bg-white rounded-2xl border border-border shadow-card p-12 text-center text-sm text-subtext">
          This admin section is ready for database-backed management.
        </div>
      </div>
    </div>
  )
}