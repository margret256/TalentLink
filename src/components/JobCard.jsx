import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, MapPin, Bookmark } from 'lucide-react'

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-card hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${job.color}`}>
            <Building2 size={20} />
          </div>
          <div className="min-w-0">
            <Link to={`/opportunities/${job.id}`} className="font-semibold text-maintext hover:text-primary transition-colors">
              {job.title}
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-subtext">
              <span>{job.company}</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {job.location}
              </span>
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => setSaved((s) => !s)}
            aria-label={saved ? 'Remove bookmark' : 'Bookmark job'}
            aria-pressed={saved}
            className="focus-ring rounded-lg p-1"
          >
            <Bookmark size={18} className={saved ? 'fill-primary text-primary' : 'text-subtext'} />
          </button>
          <span className="text-sm font-semibold text-maintext whitespace-nowrap">{job.salaryShort}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((s) => (
            <span key={s} className="text-xs font-medium bg-bg text-subtext border border-border rounded-lg px-2.5 py-1">
              {s}
            </span>
          ))}
        </div>
        <span className="text-xs text-subtext whitespace-nowrap">{job.posted}</span>
      </div>
    </div>
  )
}
