import React from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtext" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-maintext placeholder:text-subtext focus-ring focus:bg-white"
      />
    </div>
  )
}
