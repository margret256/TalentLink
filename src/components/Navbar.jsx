import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Button from './Button'

const links = [
  { label: 'Find Talent', href: '#' },
  { label: 'Find Work', href: '#' },
  { label: 'How It Works', href: '#' },
  { label: 'Pricing', href: '#' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg btn-gradient flex items-center justify-center font-bold text-white text-sm">S</div>
          <span className="font-bold text-lg text-maintext">SkillBridge</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-maintext hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <button className="flex items-center gap-1 text-sm font-medium text-maintext hover:text-primary transition-colors">
            Resources <ChevronDown size={14} />
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="text-sm font-semibold text-maintext hover:text-primary px-4 py-2">
            Log in
          </Link>
          <Button as={Link} to="/signup" size="sm">
            Sign Up
          </Button>
        </div>

        <button className="lg:hidden text-maintext" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="block text-sm font-medium text-maintext py-1.5">
              {l.label}
            </a>
          ))}
          <a href="#" className="block text-sm font-medium text-maintext py-1.5">Resources</a>
          <div className="flex gap-3 pt-3 border-t border-border">
            <Link to="/login" className="flex-1 text-center text-sm font-semibold border border-border rounded-xl py-2.5">
              Log in
            </Link>
            <Link to="/signup" className="flex-1 text-center text-sm font-semibold btn-gradient text-white rounded-xl py-2.5">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
