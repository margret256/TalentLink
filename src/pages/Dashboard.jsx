import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, FileCheck2, Bookmark, MessageSquare, Bookmark as BookmarkIcon, Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import Button from '../components/Button'
import { recentApplications, opportunitiesForYou, skills, activityFeed } from '../data/mockData'

const statusColors = {
  Pending: 'bg-amber-50 text-amber-600',
  Accepted: 'bg-green-50 text-green-600',
  Rejected: 'bg-red-50 text-red-600',
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader
          title="Welcome back, Gull 👋"
          subtitle="Here's what's happening with your profile today."
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Eye} label="Profile Views" value="1,234" change="12% this week" />
          <StatCard icon={FileCheck2} label="Applications" value="23" change="16% this week" iconBg="bg-blue-50 text-blue-600" />
          <StatCard icon={Bookmark} label="Saved Jobs" value="45" change="16% this week" iconBg="bg-purple-50 text-purple-600" />
          <StatCard icon={MessageSquare} label="Messages" value="12" change="8% this week" iconBg="bg-green-50 text-green-600" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-maintext">Recent Applications</h3>
              <Link to="/applications" className="text-xs text-primary font-medium">View all</Link>
            </div>
            <div className="space-y-3">
              {recentApplications.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-maintext truncate">{a.title}</p>
                    <p className="text-xs text-subtext">{a.company}</p>
                  </div>
                  <span className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 shrink-0 ${statusColors[a.status]}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities for you */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-maintext">Opportunities for you</h3>
              <Link to="/opportunities" className="text-xs text-primary font-medium">View all</Link>
            </div>
            <div className="space-y-3">
              {opportunitiesForYou.map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-maintext truncate">{o.title}</p>
                    <p className="text-xs text-subtext">{o.company} · {o.salary}</p>
                  </div>
                  <BookmarkIcon size={16} className="text-subtext shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Strength */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex flex-col items-center text-center">
            <h3 className="font-semibold text-maintext self-start mb-2">Profile Strength</h3>
            <div className="relative h-28 w-28 my-3">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="#5B3FD4" strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - 0.75)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-maintext">75%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-maintext">Great job!</p>
            <p className="text-xs text-subtext mt-1">Your profile is looking strong. Keep adding more details.</p>
            <Button size="sm" className="w-full mt-4">Improve Profile</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Skills overview */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-maintext">Skills Overview</h3>
              <Link to="/profile" className="text-xs text-primary font-medium">View all</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-xs font-medium bg-lightpurple text-primary rounded-lg px-3 py-1.5">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-maintext">Activity Feed</h3>
              <a href="#" className="text-xs text-primary font-medium">View all</a>
            </div>
            <div className="space-y-4">
              {activityFeed.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-lightpurple text-primary flex items-center justify-center shrink-0">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-maintext">{a.text}</p>
                    <p className="text-xs text-subtext mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
