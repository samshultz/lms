import React from 'react'
import Header from '../layouts/Header'
import Sidebar from '../layouts/Sidebar'
import Footer from '../layouts/Footer'
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux'
import DashboardHome from './DashboardHome';


const AdminDashboard = () => {
    const { user } = useSelector((state) => state.user)
    const { mobileNavOpened } = useSelector((state)=> state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)

  return (
    <>
        <Helmet>
            <title>Admin Dashboard</title>
        </Helmet>
        <div id="wrapper" className={`wrapper bg-ash ${!mobileNavOpened ? "": "sidebar-collapsed-mobile"} ${sidebarOpened ? "": "sidebar-collapsed"}`}>
            <Header />
            <div className="dashboard-page-one">
                <Sidebar />
                <div className="dashboard-content-one">
                    <DashboardHome />
            
                    <Footer />
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminDashboard