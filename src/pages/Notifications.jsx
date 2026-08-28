import React, { useEffect, useState } from 'react'
import { Bell, BriefcaseBusiness, CheckCircle2, MessageSquare } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import EmployerSidebar from '../components/EmployerSidebar'
import PageHeader from '../components/PageHeader'
import { userApi } from '../api/userApi'

const icons = { application: CheckCircle2, job: BriefcaseBusiness, message: MessageSquare }

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const isEmployer = localStorage.getItem('talentlink_user_role') === 'employer'

  useEffect(() => {
    userApi.getNotifications(isEmployer ? 'employer' : 'candidate')
      .then((data) => setNotifications(data || []))
      .catch(() => setNotifications([]))
  }, [isEmployer])

  return (
    <div className="flex min-h-screen bg-bg">
      {isEmployer ? <EmployerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /> : <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Notifications" subtitle={isEmployer ? 'Updates about your opportunities and applicants' : 'Stay up to date with your activity'} onMenuClick={() => setSidebarOpen(true)} />
        <div className="bg-white rounded-2xl border border-border shadow-card divide-y divide-border">
          {notifications.length ? notifications.map((notification) => {
            const Icon = icons[notification.type] || Bell
            return <div key={notification.id} className="flex items-start gap-3 p-5"><div className="h-10 w-10 rounded-xl bg-lightpurple text-primary flex items-center justify-center shrink-0"><Icon size={18} /></div><div><p className="text-sm font-medium text-maintext">{notification.text}</p><p className="text-xs text-subtext mt-1">{notification.time}</p></div></div>
          }) : <div className="p-12 text-center"><Bell size={28} className="mx-auto text-subtext mb-3" /><p className="text-sm text-subtext">You're all caught up! New notifications will show up here.</p></div>}
        </div>
      </div>
    </div>
  )
}