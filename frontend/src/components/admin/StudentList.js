import React from 'react'
import { Input } from "reactstrap"
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';

import Sidebar from '../layouts/Sidebar'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import StudentRow from './StudentRow'


const StudentList = () => {
    const { mobileNavOpened } = useSelector((state)=> state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)
    
  return (
    <>
        <Helmet>
            <title>Admin Dashboard - Students</title>
            <link rel="stylesheet" href="css/jquery.dataTables.min.css"></link>
            <script src="js/jquery.dataTables.min.js"></script>
            <script src="js/main.js"></script>
        </Helmet>
        <div id="wrapper" className={`wrapper bg-ash ${!mobileNavOpened ? "": "sidebar-collapsed-mobile"} ${sidebarOpened ? "": "sidebar-collapsed"}`}>
            <Header />
            <div className="dashboard-page-one">
                <Sidebar />
                <div className="dashboard-content-one">
                <div className="breadcrumbs-area">
                    <h3>Students</h3>
                    <ul>
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>All Students</li>
                    </ul>
                </div>
        
        <div className="card height-auto">
            <div className="card-body">
                <div className="heading-layout1">
                    <div className="item-title">
                        <h3>All Students Data</h3>
                    </div>
                    <div className="dropdown">
                        <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                            aria-expanded="false">...</a>

                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#"><i
                                    className="fas fa-times text-orange-red"></i>Close</a>
                            <a className="dropdown-item" href="#"><i
                                    className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                            <a className="dropdown-item" href="#"><i
                                    className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                        </div>
                    </div>
                </div>
                <form className="mg-b-20">
                    <div className="row gutters-8">
                        <div className="col-3-xxxl col-xl-3 col-lg-3 col-12 form-group">
                            <Input type="text" placeholder="Search by Roll ..." className="form-control" />
                        </div>
                        <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group">
                            <Input type="text" placeholder="Search by Name ..." className="form-control" />
                        </div>
                        <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
                            <Input type="text" placeholder="Search by Class ..." className="form-control" />
                        </div>
                        <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
                            <button type="submit" className="fw-btn-fill btn-gradient-yellow">SEARCH</button>
                        </div>
                    </div>
                </form>
                <div className="table-responsive">
                    <table className="table display data-table text-nowrap">
                        <thead>
                            <tr>
                                <th>
                                    <div className="form-check">
                                        <Input type="checkbox" className="form-check-input checkAll" />
                                        <label className="form-check-label">Roll</label>
                                    </div>
                                </th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Parents</th>
                                <th>Address</th>
                                <th>Date Of Birth</th>
                                <th>Phone</th>
                                <th>E-mail</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <StudentRow />
                            <StudentRow />
                            
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            
                    <Footer />
                </div>
            </div>
        </div>
        
    </>
  )
}

export default StudentList