import React, { useState } from 'react'
import { Briefcase, Check } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

const steps = [
  { id: 1, label: 'Basic Information' },
  { id: 2, label: 'Job Description' },
  { id: 3, label: 'Requirements' },
  { id: 4, label: 'Additional Details' },
  { id: 5, label: 'Review & Publish' },
]

export default function PostOpportunity() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    jobType: '',
    skills: '',
    experience: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
  })

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const next = () => setStep((s) => Math.min(s + 1, 5))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <div className="flex items-center gap-3 mb-2 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="border border-border rounded-lg p-1.5" aria-label="Open menu">
            <Briefcase size={18} />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-maintext mb-6">Create a New Opportunity</h1>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Stepper */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 h-fit">
            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.id} className="flex items-start gap-3">
                  <span
                    className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                      step > s.id
                        ? 'bg-primary text-white'
                        : step === s.id
                        ? 'btn-gradient text-white'
                        : 'bg-bg border border-border text-subtext'
                    }`}
                  >
                    {step > s.id ? <Check size={14} /> : s.id}
                  </span>
                  <span className={`text-sm mt-1 ${step === s.id ? 'font-semibold text-maintext' : 'text-subtext'}`}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-6">
            {step === 1 && (
              <StepWrap title="Basic Information" desc="Enter the basic details about the role">
                <Field label="Job Title" placeholder="e.g. Frontend Developer" value={form.title} onChange={update('title')} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <SelectField label="Category" value={form.category} onChange={update('category')} options={['Web Development', 'Mobile Development', 'UI/UX Design']} />
                  <SelectField label="Job Type" value={form.jobType} onChange={update('jobType')} options={['Full Time', 'Part Time', 'Contract']} />
                </div>
                <Field label="Location" placeholder="e.g. Remote or Lahore" value={form.location} onChange={update('location')} />
              </StepWrap>
            )}

            {step === 2 && (
              <StepWrap title="Job Description" desc="Describe the role and responsibilities">
                <div>
                  <label className="block text-sm font-medium text-maintext mb-1.5">Job Description</label>
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={update('description')}
                    placeholder="Describe the responsibilities and expectations for this role..."
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm focus-ring focus:bg-white"
                  />
                </div>
              </StepWrap>
            )}

            {step === 3 && (
              <StepWrap title="Requirements" desc="List required skills and experience level">
                <Field label="Required Skills" placeholder="e.g. React, JavaScript, Tailwind CSS" value={form.skills} onChange={update('skills')} />
                <SelectField label="Experience Level" value={form.experience} onChange={update('experience')} options={['Junior Level', 'Mid Level', 'Senior Level']} />
              </StepWrap>
            )}

            {step === 4 && (
              <StepWrap title="Additional Details" desc="Set compensation and deadline">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Salary Range (Min)" placeholder="Minimum" value={form.salaryMin} onChange={update('salaryMin')} />
                  <Field label="Salary Range (Max)" placeholder="Maximum" value={form.salaryMax} onChange={update('salaryMax')} />
                </div>
                <Field label="Application Deadline" type="date" value={form.deadline} onChange={update('deadline')} />
              </StepWrap>
            )}

            {step === 5 && (
              <StepWrap title="Review & Publish" desc="Double-check the details before publishing">
                <div className="space-y-3 text-sm">
                  <Row label="Job Title" value={form.title || '—'} />
                  <Row label="Category" value={form.category || '—'} />
                  <Row label="Job Type" value={form.jobType || '—'} />
                  <Row label="Location" value={form.location || '—'} />
                  <Row label="Experience Level" value={form.experience || '—'} />
                  <Row label="Salary Range" value={form.salaryMin || form.salaryMax ? `${form.salaryMin} - ${form.salaryMax}` : '—'} />
                  <Row label="Deadline" value={form.deadline || '—'} />
                </div>
              </StepWrap>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={step === 1 ? undefined : back}>
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button onClick={step === 5 ? undefined : next}>
                {step === 5 ? 'Publish Opportunity' : 'Next Step'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepWrap({ title, desc, children }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold text-lg text-maintext">{title}</h2>
        <p className="text-sm text-subtext mt-0.5">{desc}</p>
      </div>
      {children}
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-maintext mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white"
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-maintext mb-1.5">{label}</label>
      <select value={value} onChange={onChange} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white">
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-border pb-2">
      <span className="text-subtext">{label}</span>
      <span className="font-medium text-maintext">{value}</span>
    </div>
  )
}
