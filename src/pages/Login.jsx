import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, BadgeCheck, Gift } from 'lucide-react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.password) errs.password = 'Password is required'
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
          {/* Login card */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-8">
            <h2 className="text-2xl font-bold text-maintext">Welcome Back! 👋</h2>
            <p className="text-sm text-subtext mt-1">Login to your account</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-maintext mb-1.5">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-maintext mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-subtext">
                  <input type="checkbox" className="rounded border-border text-primary focus-ring" />
                  Remember me
                </label>
                <a href="#" className="text-primary font-medium">Forgot password?</a>
              </div>

              <Button type="submit" className="w-full" size="lg">Log In</Button>

              <div className="flex items-center gap-3 text-xs text-subtext">
                <span className="flex-1 h-px bg-border" /> or continue with <span className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-sm font-medium hover:bg-bg focus-ring">
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-sm font-medium hover:bg-bg focus-ring">
                  GitHub
                </button>
              </div>

              <p className="text-center text-sm text-subtext">
                Don't have an account? <Link to="/signup" className="text-primary font-semibold">Sign up</Link>
              </p>
            </form>
          </div>

          {/* Signup preview card */}
          <SignupPreview />
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

function SignupPreview() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-8 hidden lg:block opacity-90">
      <h2 className="text-2xl font-bold text-maintext">Create Account 🚀</h2>
      <p className="text-sm text-subtext mt-1">Join SkillBridge today</p>
      <div className="mt-8 space-y-5">
        {['Full Name', 'Email Address', 'Password'].map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium text-maintext mb-1.5">{f}</label>
            <div className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-subtext">
              {f === 'Password' ? '••••••••' : `Enter your ${f.toLowerCase()}`}
            </div>
          </div>
        ))}
        <Link to="/signup">
          <Button className="w-full" size="lg">Sign Up</Button>
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
