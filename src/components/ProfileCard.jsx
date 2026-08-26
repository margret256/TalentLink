import React from 'react'
import { BadgeCheck, MapPin, MoreHorizontal } from 'lucide-react'
import Button from './Button'

export default function ProfileCard({ name, role, location, avatar }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="h-32 md:h-40 btn-gradient relative">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 40%, white 0, transparent 40%), radial-gradient(circle at 80% 60%, white 0, transparent 40%)'
        }} />
      </div>
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <img
              src={avatar}
              alt={`${name} avatar`}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-card"
            />
            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-maintext">{name}</h2>
                <BadgeCheck size={16} className="text-primary fill-lightpurple" />
              </div>
              <p className="text-sm text-subtext">{role}</p>
              <p className="text-xs text-subtext flex items-center gap-1 mt-0.5">
                <MapPin size={12} /> {location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <Button variant="primary" size="sm">Edit Profile</Button>
            <Button variant="outline" size="sm">View Public Profile</Button>
            <button aria-label="More options" className="h-9 w-9 flex items-center justify-center rounded-xl border border-border text-subtext hover:text-maintext focus-ring">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
