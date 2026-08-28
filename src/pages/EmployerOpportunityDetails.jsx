import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, MapPin } from 'lucide-react'
import EmployerSidebar from '../components/EmployerSidebar'
import PageHeader from '../components/PageHeader'
import { jobsApi } from '../api/jobsApi'

export default function EmployerOpportunityDetails() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    jobsApi.getEmployerJob(id)
      .then(setJob)
      .catch((loadError) => setError(loadError.message))
  }, [id])

  return (
    <div className="flex min-h-screen bg-bg">
      <EmployerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Published Opportunity" subtitle="Review the details you published" onMenuClick={() => setSidebarOpen(true)} />
        <Link to="/employer/dashboard" className="inline-flex items-center gap-2 text-sm text-subtext hover:text-primary mb-6"><ArrowLeft size={15} />Back to Dashboard</Link>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!job && !error && <p className="text-sm text-subtext">Loading opportunity...</p>}
        {job && (
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-border shadow-card p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex items-start gap-4"><div className="h-14 w-14 rounded-xl bg-lightpurple text-primary flex items-center justify-center"><BriefcaseBusiness size={25} /></div><div><h1 className="text-xl font-bold text-maintext">{job.title}</h1><p className="text-sm text-subtext mt-1">{job.company}</p><p className="text-xs text-subtext mt-2 flex items-center gap-1"><MapPin size={13} />{job.location}</p></div></div>
                <div className="text-left md:text-right"><p className="font-bold text-maintext">{job.salary || 'Salary not specified'}</p><p className="text-xs text-subtext mt-1">Posted {job.posted}</p></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5"><span className="text-xs bg-bg border border-border rounded-lg px-3 py-1.5">{job.type}</span><span className="text-xs bg-bg border border-border rounded-lg px-3 py-1.5">{job.experience}</span><span className="text-xs bg-bg border border-border rounded-lg px-3 py-1.5">Deadline: {job.deadline || 'Not specified'}</span></div>
            </section>
            <section className="bg-white rounded-2xl border border-border shadow-card p-6"><h2 className="font-semibold text-maintext mb-3">Job Description</h2><p className="text-sm text-subtext leading-relaxed whitespace-pre-wrap">{job.description || 'No description added.'}</p></section>
            <section className="bg-white rounded-2xl border border-border shadow-card p-6"><h2 className="font-semibold text-maintext mb-3">Requirements</h2>{job.requirements?.length ? <ul className="space-y-2">{job.requirements.map((requirement) => <li key={requirement} className="flex items-start gap-2 text-sm text-subtext"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />{requirement}</li>)}</ul> : <p className="text-sm text-subtext">No requirements added.</p>}</section>
            <section className="bg-white rounded-2xl border border-border shadow-card p-6"><h2 className="font-semibold text-maintext mb-3">Required Skills</h2><div className="flex flex-wrap gap-2">{job.skills?.length ? job.skills.map((skill) => <span key={skill} className="text-xs font-medium bg-lightpurple text-primary rounded-lg px-3 py-1.5">{skill}</span>) : <p className="text-sm text-subtext">No skills added.</p>}</div></section>
          </div>
        )}
      </div>
    </div>
  )
}