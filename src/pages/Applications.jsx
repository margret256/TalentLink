import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
import ApplicationCard from '../components/ApplicationCard'
import Button from '../components/Button'
import { applications } from '../data/mockData'

const tabs = ['All', 'Pending', 'Accepted', 'Rejected', 'Withdrawn']

export default function Applications() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')

  const filtered =
    activeTab === 'All' ? applications : applications.filter((a) => a.status === activeTab)

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="My Applications" subtitle="Track the status of your job applications" onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex gap-2 overflow-x-auto mb-6 bg-white rounded-xl border border-border p-1.5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-ring ${
                activeTab === tab ? 'btn-gradient text-white' : 'text-subtext hover:text-maintext'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filtered.length > 0 ? (
              filtered.map((app) => <ApplicationCard key={app.id} app={app} />)
            ) : (
              <div className="bg-white rounded-2xl border border-border p-10 text-center text-subtext text-sm">
                No {activeTab.toLowerCase()} applications yet.
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-card p-6 h-fit">
            <h3 className="font-semibold text-maintext mb-4">Application Tips</h3>
            <ul className="space-y-3">
              {[
                'Make sure your profile is complete',
                'Tailor your proposal for each job',
                'Highlight relevant skills and experience',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-subtext">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-5" variant="outline">View Experience</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
