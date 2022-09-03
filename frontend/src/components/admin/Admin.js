import React from 'react'
import { Routes, Route } from "react-router-dom";
import AddStudent from './AddStudent';
import AdminDashboard from './AdminDashboard';
import StudentList from './StudentList';
import StudentDetails from './StudentDetail'

const Admin = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={ <AdminDashboard /> } />
        <Route path="/students" element={ <StudentList /> } />
        <Route path="/students/details/:studentID/:ID" element={ <StudentDetails /> } />
        <Route path="/students/add" element={ <AddStudent /> } />
    </Routes>
  )
}

export default Admin