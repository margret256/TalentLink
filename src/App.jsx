import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Bookmark, MessageSquare, Bell, Settings, Briefcase, BookOpen } from 'lucide-react'

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
import EmployerDashboard from './pages/EmployerDashboard'
import SimplePage from './pages/SimplePage'
import Notifications from './pages/Notifications'
import ProtectedRoute from './components/ProtectedRoute'
import AdminPage from './pages/AdminPage'
import Messages from './pages/Messages'
import EmployerOpportunityDetails from './pages/EmployerOpportunityDetails'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute roles={['talent', 'candidate']}><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute roles={['talent', 'candidate']}><Profile /></ProtectedRoute>} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/post-opportunity" element={<ProtectedRoute roles={['employer']}><PostOpportunity /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute roles={['talent', 'candidate']}><Applications /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      {['users', 'opportunities', 'applications', 'projects', 'reports', 'messages', 'settings'].map((section) => (
        <Route key={section} path={`/admin/${section}`} element={<ProtectedRoute roles={['admin']}><AdminPage title={`Admin ${section}`} subtitle="Platform administration" /></ProtectedRoute>} />
      ))}
      <Route path="/employer/dashboard" element={<ProtectedRoute roles={['employer']}><EmployerDashboard /></ProtectedRoute>} />
      <Route path="/employer/jobs/:id" element={<ProtectedRoute roles={['employer']}><EmployerOpportunityDetails /></ProtectedRoute>} />

      <Route
        path="/resources"
        element={
          <SimplePage
            title="Resources"
            subtitle="Helpful guides, templates, and platform tips"
            icon={BookOpen}
            emptyText="Resources and learning materials will appear here soon."
          />
        }
      />
      <Route
        path="/my-projects"
        element={
          <ProtectedRoute roles={['talent', 'candidate']}><SimplePage
            title="My Projects"
            subtitle="Showcase the work you've shipped"
            icon={Briefcase}
            resource="getProjects"
            emptyText="You haven't added any projects yet. Add a project to strengthen your profile."
          /></ProtectedRoute>
        }
      />
      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute roles={['talent', 'candidate']}><SimplePage
            title="Saved Jobs"
            subtitle="Jobs you've bookmarked for later"
            icon={Bookmark}
            resource="getSavedJobs"
            emptyText="No saved jobs yet. Bookmark jobs from Opportunities to see them here."
          /></ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute><Messages /></ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute><SimplePage
            title="Settings"
            subtitle="Manage your account preferences"
            icon={Settings}
            resource="getSettings"
            emptyText="Account settings, notifications, and privacy controls will appear here."
          /></ProtectedRoute>
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
