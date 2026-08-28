import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BriefcaseBusiness, Users, FileCheck2, Plus } from 'lucide-react'
import EmployerSidebar from '../components/EmployerSidebar'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import Button from '../components/Button'
import { jobsApi } from '../api/jobsApi'

export default function EmployerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobs, setJobs] = useState([])
  const isEmployer = localStorage.getItem('talentlink_user_role') === 'employer'

  useEffect(() => {
    if (isEmployer) jobsApi.getEmployerJobs().then(setJobs).catch(() => setJobs([]))
  }, [isEmployer])

  if (!isEmployer) return <Navigate to="/dashboard" replace />

  return (
    <div className="flex min-h-screen bg-bg">
      <EmployerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Employer Dashboard" subtitle="Manage your opportunities and find the right talent" onMenuClick={() => setSidebarOpen(true)} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard icon={BriefcaseBusiness} label="Posted Opportunities" value={jobs.length} change="Active listings" />
          <StatCard icon={Users} label="Total Applicants" value="0" change="Across your listings" iconBg="bg-blue-50 text-blue-600" />
          <StatCard icon={FileCheck2} label="Shortlisted" value="0" change="Ready for review" iconBg="bg-green-50 text-green-600" />
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4"><h2 className="font-semibold text-maintext">Your Opportunities</h2><Button as={Link} to="/post-opportunity" size="sm"><Plus size={15} />Post Opportunity</Button></div>
          <div className="space-y-3">
            {jobs.length ? jobs.map((job) => <div key={job.id} className="flex items-center justify-between gap-4 border-b border-border last:border-0 pb-3 last:pb-0"><div><p className="text-sm font-semibold text-maintext">{job.title}</p><p className="text-xs text-subtext">{job.company} · {job.location}</p></div><Link to={`/employer/jobs/${job.id}`} className="text-xs text-primary font-semibold">View</Link></div>) : <p className="text-sm text-subtext">No opportunities posted yet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}