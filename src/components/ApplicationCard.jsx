import React from 'react'
import { Building2, MoreVertical } from 'lucide-react'

export default function ApplicationCard({ app }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-lightpurple text-primary flex items-center justify-center">
          <Building2 size={20} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-maintext truncate">{app.title}</p>
          <p className="text-xs text-subtext">{app.company}</p>
          <p className="text-xs text-subtext mt-0.5">Applied on {app.appliedDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-xs font-semibold rounded-lg px-3 py-1.5 ${app.color}`}>{app.status}</span>
        <button aria-label="More options" className="text-subtext hover:text-maintext focus-ring rounded-lg p-1">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  )
}
