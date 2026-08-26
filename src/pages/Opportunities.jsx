import React, { useState, useMemo } from 'react'
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'
import JobCard from '../components/JobCard'
import { jobs } from '../data/mockData'

export default function Opportunities() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [location, setLocation] = useState('All Locations')
  const [jobType, setJobType] = useState('Job Type')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesQuery =
        !query ||
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company.toLowerCase().includes(query.toLowerCase()) ||
        j.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
      const matchesLocation = location === 'All Locations' || j.location === location
      const matchesType = jobType === 'Job Type' || j.type === jobType
      return matchesQuery && matchesLocation && matchesType
    })
  }, [query, location, jobType])

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Opportunities" subtitle="Find your next role from top companies" onMenuClick={() => setSidebarOpen(true)} />

        <div className="bg-white rounded-2xl border border-border shadow-card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, skills or companies..."
              className="flex-1"
            />
            <div className="flex flex-wrap gap-3">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring">
                <option>All Categories</option>
                <option>Development</option>
                <option>Design</option>
              </select>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring">
                <option>All Locations</option>
                <option>Remote</option>
                <option>Lahore, Pakistan</option>
                <option>Islamabad, Pakistan</option>
              </select>
              <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring">
                <option>Job Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
              <button className="flex items-center gap-2 bg-lightpurple text-primary rounded-xl px-4 py-2.5 text-sm font-semibold focus-ring">
                <SlidersHorizontal size={15} /> Filters
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="bg-white rounded-2xl border border-border p-10 text-center text-subtext text-sm">
              No jobs match your search. Try different keywords or filters.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 text-sm text-subtext">
          <span>Showing 1 to {filtered.length} of {filtered.length} results</span>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border focus-ring" aria-label="Previous page">
              <ChevronLeft size={15} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium focus-ring ${
                  page === p ? 'btn-gradient text-white' : 'border border-border text-maintext'
                }`}
              >
                {p}
              </button>
            ))}
            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border focus-ring" aria-label="Next page">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
