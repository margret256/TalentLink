import React from 'react'
import { X } from 'lucide-react'

export default function SkillTag({ children, onRemove, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg bg-lightpurple text-primary text-xs font-medium px-3 py-1.5 ${className}`}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-primary/10 rounded-full p-0.5 focus-ring"
          aria-label={`Remove ${children}`}
        >
          <X size={12} />
        </button>
      )}
    </span>
  )
}
