import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, BadgeCheck, Gift } from 'lucide-react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', agree: false })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name) errs.name = 'Full name is required'
    if (!form.email) errs.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (!form.role) errs.role = 'Please select a role'
    if (!form.agree) errs.agree = 'You must agree to the Terms & Conditions'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-8">
          <LoginPreview />

          <div className="bg-white rounded-2xl border border-border shadow-card p-8">
            <h2 className="text-2xl font-bold text-maintext">Create Account 🚀</h2>
            <p className="text-sm text-subtext mt-1">Join SkillBridge today</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-maintext mb-1.5">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-maintext mb-1.5">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-maintext mb-1.5">Password</label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-subtext"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="signup-role" className="block text-sm font-medium text-maintext mb-1.5">I am a</label>
                <select
                  id="signup-role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white text-subtext"
                >
                  <option value="">Select your role</option>
                  <option value="talent">Talent / Job Seeker</option>
                  <option value="employer">Employer / Recruiter</option>
                </select>
                {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="flex items-start gap-2 text-sm text-subtext">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="rounded border-border text-primary focus-ring mt-0.5"
                  />
                  I agree to the Terms & Conditions
                </label>
                {errors.agree && <p className="text-xs text-red-500 mt-1">{errors.agree}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg">Sign Up</Button>

              <p className="text-center text-sm text-subtext">
                Already have an account? <Link to="/login" className="text-primary font-semibold">Log in</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          <TrustCard icon={Gift} title="100% Free" desc="Create your profile and apply for jobs for free" />
          <TrustCard icon={BadgeCheck} title="Verified Profiles" desc="Trusted platform with verified users" />
          <TrustCard icon={ShieldCheck} title="Secure & Safe" desc="Your data is encrypted and secure" />
        </div>
      </div>
    </div>
  )
}

function LoginPreview() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-8 hidden lg:block opacity-90">
      <h2 className="text-2xl font-bold text-maintext">Welcome Back! 👋</h2>
      <p className="text-sm text-subtext mt-1">Login to your account</p>
      <div className="mt-8 space-y-5">
        {['Email Address', 'Password'].map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium text-maintext mb-1.5">{f}</label>
            <div className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-subtext">
              {f === 'Password' ? '••••••••' : 'Enter your email'}
            </div>
          </div>
        ))}
        <Link to="/login">
          <Button className="w-full" size="lg">Log In</Button>
        </Link>
      </div>
    </div>
  )
}

function TrustCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl bg-lightpurple text-primary flex items-center justify-center shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="font-semibold text-sm text-maintext">{title}</p>
        <p className="text-xs text-subtext mt-0.5">{desc}</p>
      </div>
    </div>
  )
}
