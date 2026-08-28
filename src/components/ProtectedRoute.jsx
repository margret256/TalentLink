import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem('talentlink_token')
  const role = localStorage.getItem('talentlink_user_role')

  if (!token) return <Navigate to="/login" replace />
  if (roles && !roles.includes(role) && !(roles.includes('talent') && role === 'candidate')) return <Navigate to={role === 'employer' ? '/employer/dashboard' : '/dashboard'} replace />
  return children
}