import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg btn-gradient flex items-center justify-center font-bold text-white text-sm">S</div>
            <span className="font-bold text-lg text-white">SkillBridge</span>
          </Link>
          <p className="text-sm">Bridging skilled people with meaningful opportunities.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li>Find Talent</li>
            <li>Find Work</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>Blog</li>
            <li>Help Center</li>
            <li>Terms & Privacy</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-white/10">
        © 2026 SkillBridge. All rights reserved.
      </div>
    </footer>
  )
}
