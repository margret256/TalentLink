import React from 'react'
import { TrendingUp } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, change, iconBg = 'bg-lightpurple text-primary' }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-maintext">{value}</p>
      <p className="text-xs text-subtext mt-1">{label}</p>
      {change && (
        <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
          <TrendingUp size={12} /> {change}
        </p>
      )}
    </div>
  )
}
