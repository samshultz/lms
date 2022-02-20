import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={ <AdminDashboard /> } />
    </Routes>
  )
}

export default Admin