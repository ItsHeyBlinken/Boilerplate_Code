/**
 * Main Application Component
 * 
 * This component defines the main application structure with routing,
 * authentication, and real-time communication for the CRM platform.
 * 
 * Features:
 * - React Router setup with protected routes
 * - Authentication context provider
 * - Real-time communication (Socket.io)
 * - Layout component with sidebar/navigation
 * - Route protection based on user roles
 * - Admin dashboard routes
 * - 404 error handling
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'

// Layout components
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/Auth/ProtectedRoute'

// Pages
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import ContactDetail from './pages/ContactDetail'
import Leads from './pages/Leads'
import LeadDetail from './pages/LeadDetail'
import Deals from './pages/Deals'
import DealDetail from './pages/DealDetail'
import Tasks from './pages/Tasks'
import TaskDetail from './pages/TaskDetail'
import Activities from './pages/Activities'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminSettings from './pages/Admin/AdminSettings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetail />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="deals" element={<Deals />} />
            <Route path="deals/:id" element={<DealDetail />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/:id" element={<TaskDetail />} />
            <Route path="activities" element={<Activities />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="ADMIN">
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App