import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Building2, MapPin, CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import { jobs } from '../data/mockData'

export default function OpportunityDetails() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const job = jobs.find((j) => String(j.id) === id) || jobs[0]
  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <Link to="/opportunities" className="inline-flex items-center gap-2 text-sm text-subtext hover:text-primary mb-6">
          <ArrowLeft size={15} /> Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl border border-border shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${job.color}`}>
                <Building2 size={26} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-maintext">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-subtext mt-1">
                  <span>{job.company}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className="bg-bg border border-border rounded-md px-2 py-0.5">{job.type}</span>
                  <span className="bg-bg border border-border rounded-md px-2 py-0.5">{job.experience}</span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="font-bold text-maintext">{job.salary}</p>
              <p className="text-xs text-subtext">Posted {job.posted}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button onClick={() => setApplied(true)} disabled={applied}>
              {applied ? 'Applied ✓' : 'Apply Now'}
            </Button>
            <Button variant="outline" onClick={() => setSaved((s) => !s)}>
              {saved ? 'Job Saved ✓' : 'Save Job'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-border shadow-card p-6">
              <h2 className="font-semibold text-maintext mb-3">Job Description</h2>
              <p className="text-sm text-subtext leading-relaxed">{job.description}</p>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-card p-6">
              <h2 className="font-semibold text-maintext mb-3">Requirements</h2>
              <ul className="space-y-2.5">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-subtext">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border shadow-card p-6">
              <h2 className="font-semibold text-maintext mb-4">Job Overview</h2>
              <dl className="space-y-3 text-sm">
                <Row label="Job Type" value={job.type} />
                <Row label="Experience" value={job.experience} />
                <Row label="Location" value={job.location} />
                <Row label="Salary Range" value={job.salary} />
                <Row label="Application Deadline" value={job.deadline} />
              </dl>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-card p-6">
              <h2 className="font-semibold text-maintext mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[...job.skills, 'Redux'].map((s) => (
                  <span key={s} className="text-xs font-medium bg-lightpurple text-primary rounded-lg px-3 py-1.5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-subtext">{label}</dt>
      <dd className="font-medium text-maintext text-right">{value}</dd>
    </div>
  )
}
