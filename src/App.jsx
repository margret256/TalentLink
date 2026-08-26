import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Bookmark, MessageSquare, Bell, Settings, Briefcase } from 'lucide-react'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Opportunities from './pages/Opportunities'
import OpportunityDetails from './pages/OpportunityDetails'
import PostOpportunity from './pages/PostOpportunity'
import Applications from './pages/Applications'
import AdminDashboard from './pages/AdminDashboard'
import SimplePage from './pages/SimplePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/post-opportunity" element={<PostOpportunity />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route
        path="/my-projects"
        element={
          <SimplePage
            title="My Projects"
            subtitle="Showcase the work you've shipped"
            icon={Briefcase}
            emptyText="You haven't added any projects yet. Add a project to strengthen your profile."
          />
        }
      />
      <Route
        path="/saved-jobs"
        element={
          <SimplePage
            title="Saved Jobs"
            subtitle="Jobs you've bookmarked for later"
            icon={Bookmark}
            emptyText="No saved jobs yet. Bookmark jobs from Opportunities to see them here."
          />
        }
      />
      <Route
        path="/messages"
        element={
          <SimplePage
            title="Messages"
            subtitle="Conversations with employers and recruiters"
            icon={MessageSquare}
            emptyText="No messages yet. Once employers reach out, conversations will appear here."
          />
        }
      />
      <Route
        path="/notifications"
        element={
          <SimplePage
            title="Notifications"
            subtitle="Stay up to date with your activity"
            icon={Bell}
            emptyText="You're all caught up! New notifications will show up here."
          />
        }
      />
      <Route
        path="/settings"
        element={
          <SimplePage
            title="Settings"
            subtitle="Manage your account preferences"
            icon={Settings}
            emptyText="Account settings, notifications, and privacy controls will appear here."
          />
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
