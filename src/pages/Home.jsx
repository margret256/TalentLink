import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Code2, Smartphone, Palette, PenTool, Megaphone, FileText } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { categories, companies } from '../data/mockData'

const iconMap = { Code2, Smartphone, Palette, PenTool, Megaphone, FileText }

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-maintext">
              Bridge Your Skills <br /> With <span className="text-gradient">Opportunities</span>
            </h1>
            <p className="mt-5 text-subtext text-base max-w-md">
              SkillBridge is a platform that connects talented people with amazing opportunities.
              Build your profile, showcase your work and grow your career.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button as={Link} to="/signup" size="lg">
                Get Started <ArrowRight size={16} />
              </Button>
              <Button as="a" href="#how-it-works" variant="outline" size="lg">
                How It Works
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-lightpurple rounded-full blur-3xl opacity-70" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 h-56 w-56 bg-purple-100 rounded-full blur-3xl opacity-60" aria-hidden="true" />
            <div
              className="absolute top-4 left-2 h-16 w-16 opacity-40"
              style={{ backgroundImage: 'radial-gradient(circle, #5B3FD4 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                alt="Developer working on laptop"
                className="rounded-2xl object-cover h-64 w-full shadow-soft mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                alt="Designer professional portrait"
                className="rounded-2xl object-cover h-64 w-full shadow-soft"
              />

              <div className="absolute top-2 left-2 bg-white rounded-xl shadow-card px-4 py-2.5 flex items-center gap-2 border border-border">
                <span className="text-primary font-bold text-sm">20K+</span>
                <span className="text-xs text-subtext">Talented People</span>
              </div>

              <div className="absolute bottom-24 -left-6 bg-white rounded-xl shadow-card px-4 py-2.5 border border-border">
                <p className="text-primary font-bold text-sm">5K+</p>
                <p className="text-xs text-subtext">Jobs Posted</p>
              </div>

              <div className="absolute -bottom-4 right-6 bg-white rounded-xl shadow-card px-4 py-2.5 flex items-center gap-1.5 border border-border">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm text-maintext">4.8</span>
                <span className="text-xs text-subtext">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted companies */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t border-border">
        <p className="text-center text-sm text-subtext mb-8">Trusted by companies and startups</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-xl font-bold text-gray-400">
          {companies.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </section>

      {/* Top categories */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-maintext">Explore Top Categories</h2>
          <p className="text-subtext text-sm mt-2">Browse skills and opportunities in different categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              <div
                key={cat.id}
                className="bg-white border border-border rounded-2xl p-5 text-center hover:shadow-soft hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="h-11 w-11 mx-auto rounded-xl bg-lightpurple text-primary flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-semibold text-maintext">{cat.title}</p>
                <p className="text-xs text-subtext mt-1">{cat.jobs} Jobs</p>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
