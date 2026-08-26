import React, { useState } from 'react'
import { Users, Briefcase, FileCheck2, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'
import AdminSidebar from '../components/AdminSidebar'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { usersGrowth, applicationsByStatus, recentUsers } from '../data/mockData'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Dashboard Overview" subtitle="May 20 – May 27, 2026" onMenuClick={() => setSidebarOpen(true)} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total Users" value="1,245" change="12% this week" />
          <StatCard icon={Briefcase} label="Total Opportunities" value="324" change="18% this week" iconBg="bg-blue-50 text-blue-600" />
          <StatCard icon={FileCheck2} label="Total Applications" value="2,345" change="16% this week" iconBg="bg-purple-50 text-purple-600" />
          <StatCard icon={DollarSign} label="Total Revenue" value="$12,540" change="20% this week" iconBg="bg-green-50 text-green-600" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-semibold text-maintext mb-4">Users Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usersGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                  <Line type="monotone" dataKey="users" stroke="#5B3FD4" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-semibold text-maintext mb-4">Applications by Status</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationsByStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {applicationsByStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {applicationsByStatus.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-subtext">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </span>
                  <span className="font-semibold text-maintext">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-card p-5 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-maintext">Recent Users</h3>
            <a href="#" className="text-xs text-primary font-medium">View all</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentUsers.map((u, idx) => (
              <div key={u.id} className="flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/80?img=${20 + idx}`}
                  alt={`${u.name} avatar`}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-maintext truncate">{u.name}</p>
                  <p className="text-xs text-subtext truncate">{u.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
