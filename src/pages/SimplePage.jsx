import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import EmployerSidebar from '../components/EmployerSidebar'
import PageHeader from '../components/PageHeader'
import { userApi } from '../api/userApi'

export default function SimplePage({ title, subtitle, icon: Icon, emptyText, resource }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState(null)
  const isEmployer = localStorage.getItem('talentlink_user_role') === 'employer'

  useEffect(() => {
    if (!resource) return
    userApi[resource]().then(setData).catch(() => setData(null))
  }, [resource])

  const items = Array.isArray(data) ? data : []
  const details = data && !Array.isArray(data) ? Object.entries(data) : []

  return (
    <div className="flex min-h-screen bg-bg">
      {isEmployer ? (
        <EmployerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      ) : (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <div className="bg-white rounded-2xl border border-border shadow-card p-6">
          {items.length ? <div className="space-y-3">{items.map((item) => <div key={item.id || item.title || item.sender} className="border-b border-border last:border-0 pb-3 last:pb-0"><p className="text-sm font-semibold text-maintext">{item.title || item.sender || item.text}</p><p className="text-xs text-subtext mt-1">{item.description || item.preview || item.company || item.time || item.status || ''}</p></div>)}</div> : details.length ? <div className="space-y-3">{details.map(([key, value]) => <div key={key} className="flex justify-between gap-4 border-b border-border last:border-0 pb-3 last:pb-0"><span className="text-sm text-subtext capitalize">{key}</span><span className="text-sm font-medium text-maintext text-right">{String(value)}</span></div>)}</div> : (
            <div className="p-10 flex flex-col items-center text-center">
              {Icon && <div className="h-14 w-14 rounded-2xl bg-lightpurple text-primary flex items-center justify-center mb-4"><Icon size={26} /></div>}
              <p className="text-sm text-subtext max-w-sm">{emptyText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
