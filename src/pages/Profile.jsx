import React, { useState } from 'react'
import { Plus, Linkedin, Github, Globe } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
import ProfileCard from '../components/ProfileCard'
import SkillTag from '../components/SkillTag'
import { profileSkills as initialSkills } from '../data/mockData'

const tabs = ['About', 'Skills', 'Experience', 'Education', 'Projects', 'Social Links']

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Skills')
  const [profileSkills, setProfileSkills] = useState(initialSkills)
  const [newSkill, setNewSkill] = useState('')
  const [showInput, setShowInput] = useState(false)

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (trimmed && !profileSkills.includes(trimmed)) {
      setProfileSkills([...profileSkills, trimmed])
    }
    setNewSkill('')
    setShowInput(false)
  }

  const removeSkill = (skill) => {
    setProfileSkills(profileSkills.filter((s) => s !== skill))
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Profile & Skills" onMenuClick={() => setSidebarOpen(true)} />

        <ProfileCard
          name="Gull Abbas"
          role="Frontend Developer"
          location="Lahore, Pakistan"
          avatar="https://i.pravatar.cc/200?img=12"
        />

        <div className="mt-6 bg-white rounded-2xl border border-border shadow-card">
          <div className="flex items-center gap-1 px-4 pt-2 overflow-x-auto border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus-ring ${
                  activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-subtext hover:text-maintext'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'Skills' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-maintext mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {profileSkills.map((skill) => (
                      <SkillTag key={skill} onRemove={() => removeSkill(skill)}>
                        {skill}
                      </SkillTag>
                    ))}
                    {showInput ? (
                      <input
                        autoFocus
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                        onBlur={addSkill}
                        placeholder="Skill name"
                        className="text-xs border border-border rounded-lg px-3 py-1.5 focus-ring w-32"
                      />
                    ) : (
                      <button
                        onClick={() => setShowInput(true)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary border border-dashed border-primary/40 rounded-lg px-3 py-1.5 hover:bg-lightpurple focus-ring"
                      >
                        <Plus size={12} /> Add Skill
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-maintext mb-3">Experience Level</h3>
                  <select className="w-full sm:w-64 bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring">
                    <option>Beginner</option>
                    <option defaultValue>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-maintext mb-3">Social Links</h3>
                  <div className="flex gap-3">
                    <button aria-label="LinkedIn" className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-subtext hover:text-primary hover:border-primary focus-ring">
                      <Linkedin size={18} />
                    </button>
                    <button aria-label="GitHub" className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-subtext hover:text-primary hover:border-primary focus-ring">
                      <Github size={18} />
                    </button>
                    <button aria-label="Website" className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-subtext hover:text-primary hover:border-primary focus-ring">
                      <Globe size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'About' && (
              <p className="text-sm text-subtext leading-relaxed max-w-2xl">
                Frontend Developer with a passion for building clean, accessible, and performant web
                applications. Experienced with modern JavaScript frameworks and a strong eye for detail.
              </p>
            )}

            {activeTab === 'Experience' && (
              <div className="space-y-4">
                <ExperienceItem role="Frontend Developer" company="CodeWave" period="2023 — Present" />
                <ExperienceItem role="Junior Web Developer" company="Pixel Perfect" period="2021 — 2023" />
              </div>
            )}

            {activeTab === 'Education' && (
              <ExperienceItem role="BS Computer Science" company="University of the Punjab" period="2017 — 2021" />
            )}

            {activeTab === 'Projects' && (
              <p className="text-sm text-subtext">No projects added yet. Showcase your work to stand out.</p>
            )}

            {activeTab === 'Social Links' && (
              <div className="flex gap-3">
                <button aria-label="LinkedIn" className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-subtext hover:text-primary hover:border-primary focus-ring">
                  <Linkedin size={18} />
                </button>
                <button aria-label="GitHub" className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-subtext hover:text-primary hover:border-primary focus-ring">
                  <Github size={18} />
                </button>
                <button aria-label="Website" className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-subtext hover:text-primary hover:border-primary focus-ring">
                  <Globe size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ExperienceItem({ role, company, period }) {
  return (
    <div className="border border-border rounded-xl p-4">
      <p className="font-semibold text-sm text-maintext">{role}</p>
      <p className="text-xs text-subtext mt-0.5">{company} · {period}</p>
    </div>
  )
}
