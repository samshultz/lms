import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import moment from "moment"
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component';
import { useLocation, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import Sidebar from '../layouts/Sidebar'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import StudentRow from './StudentRow'
import {
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Label
} from "reactstrap"

const StudentDetails = () => {
    const location = useLocation()
    const { student } = location.state
    const { mobileNavOpened } = useSelector((state)=> state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)
    const [isMenuOpened, setMenuOpenStatus] = useState(false)
    
    return (
            <>
                <Helmet>
                    <title>Admin Dashboard - Students</title>
                    <script src="js/main.js"></script>
                </Helmet>
                
                <div id="wrapper" className={`wrapper bg-ash ${!mobileNavOpened ? "": "sidebar-collapsed-mobile"} ${sidebarOpened ? "": "sidebar-collapsed"}`}>
                        <Header />
                        <div className="dashboard-page-one">
                            <Sidebar />
                            <div className="dashboard-content-one">
                                <div className="breadcrumbs-area">
                                    <h3>Admin Dashboard</h3>
                                    <ul>
                                        <li>
                                            <Link to="/admin/dashboard">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/students" >All Students</Link>
                                        </li>
                                        <li>{`${student.detail.firstName} ${student.detail.lastName}`}</li>
                                    </ul>
                                </div>
                                <div className="row">
                    <div className="col-4-xxxl col-12">
                        <div className="card dashboard-card-ten">
                            <div className="card-body">
                                <div className="heading-layout1">
                                    <div className="item-title">
                                        <h3>About Me</h3>
                                    </div>
                                    <Dropdown className="dropdown" isOpen={isMenuOpened}>
                                        <DropdownToggle tag="a" role="button" style={{fontSize: "36px", textDecoration: "none", color: "#bcbcbc"}} aria-expanded="false" onClick={() => setMenuOpenStatus(!isMenuOpened) }>...</DropdownToggle>

                                        <DropdownMenu right={true}>
                                            <DropdownItem tag="a">
                                                <i className="fas fa-times text-orange-red"></i> Close
                                            </DropdownItem>
                                        <DropdownItem tag="a">
                                            <i className="fas fa-cogs text-dark-pastel-green"></i> Edit
                                        </DropdownItem>
                                        <DropdownItem tag="a">
                                            <i className="fas fa-redo-alt text-orange-peel"></i> Refresh
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                </div>
                                <div className="student-info">
                                    <div className="media media-none--xs">
                                        <div className="item-img">
                                            <img src="img/figure/student.png" className="media-img-auto" alt="student" />
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title">{`${student.detail.firstName} ${student.detail.lastName}`}</h3>
                                            <p>{student.bio}</p>
                                        </div>
                                    </div>
                                    <div className="table-responsive info-table">
                                        <table className="table text-nowrap">
                                            <tbody>
                                                <tr>
                                                    <td>Name:</td>
                                                    <td className="font-medium text-dark-medium">{`${student.detail.firstName} ${student.detail.lastName}`}</td>
                                                </tr>
                                                <tr>
                                                    <td>Gender:</td>
                                                    <td className="font-medium text-dark-medium">{student.detail.gender}</td>
                                                </tr>
                                                <tr>
                                                    <td>Next of Kin's Name:</td>
                                                    <td className="font-medium text-dark-medium">{`${student.nextOfKin.firstName}  ${student.nextOfKin.lastName}`}</td>
                                                </tr>
                                                <tr>
                                                    <td>Next of Kin's Phone:</td>
                                                    <td className="font-medium text-dark-medium">{student.nextOfKin.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date Of Birth:</td>
                                                    <td className="font-medium text-dark-medium">{moment(student.dateOfBirth).format("Do MMM YYYY")}</td>
                                                </tr>
                                                <tr>
                                                    <td>Religion:</td>
                                                    <td className="font-medium text-dark-medium">{student.religion}</td>
                                                </tr>
                                                <tr>
                                                    <td>Blood Group:</td>
                                                    <td className="font-medium text-dark-medium">{student.bloodGroup}</td>
                                                </tr>
                                                <tr>
                                                    <td>Next of Kin's relationship:</td>
                                                    <td className="font-medium text-dark-medium">{student.nextOfKin.relationship}</td>
                                                </tr>
                                                <tr>
                                                    <td>E-Mail:</td>
                                                    <td className="font-medium text-dark-medium">{student.detail.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Admission Date:</td>
                                                    <td className="font-medium text-dark-medium">{moment(student.detail.dateAdded).format("Do MMM YYYY")}</td>
                                                </tr>
                                                <tr>
                                                    <td>Class:</td>
                                                    <td className="font-medium text-dark-medium">{student.class.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Section:</td>
                                                    <td className="font-medium text-dark-medium">{student.class.code_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Admission ID:</td>
                                                    <td className="font-medium text-dark-medium">{student.admissionID}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address:</td>
                                                    <td className="font-medium text-dark-medium">{student.detail.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone:</td>
                                                    <td className="font-medium text-dark-medium">{student.detail.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Active:</td>
                                                    <td className="font-medium text-dark-medium">{student.detail.active}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-8-xxxl col-12">
                        <div className="row">
                        
                            <div className="col-lg-4">
                                <div className="dashboard-summery-one">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="item-icon bg-light-magenta">
                                                <i className="flaticon-shopping-list text-magenta"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="item-content">
                                                <div className="item-title">Notification</div>
                                                <div className="item-number"><span className="counter" data-num="12">12</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="dashboard-summery-one">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="item-icon bg-light-blue">
                                                <i className="flaticon-calendar text-blue"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="item-content">
                                                <div className="item-title">Events</div>
                                                <div className="item-number"><span className="counter" data-num="06">06</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="dashboard-summery-one">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="item-icon bg-light-yellow">
                                                <i className="flaticon-percentage-discount text-orange"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="item-content">
                                                <div className="item-title">Attendance</div>
                                                <div className="item-number"><span className="counter" data-num="94">94</span><span>%</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-12">
                                <div className="card dashboard-card-eleven">
                                    <div className="card-body">
                                        <div className="heading-layout1">
                                            <div className="item-title">
                                                <h3>All Exam Results</h3>
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
                                        <div className="table-box-wrap">
                                            <form className="search-form-box">
                                                <div className="row gutters-8">
                                                    <div className="col-lg-4 col-12 form-group">
                                                        <input type="text" placeholder="Search by Exam ..."
                                                            className="form-control" />
                                                    </div>
                                                    <div className="col-lg-3 col-12 form-group">
                                                        <input type="text" placeholder="Search by Subject ..."
                                                            className="form-control" />
                                                    </div>
                                                    <div className="col-lg-3 col-12 form-group">
                                                        <input type="text" placeholder="dd/mm/yyyy"
                                                            className="form-control" />
                                                    </div>
                                                    <div className="col-lg-2 col-12 form-group">
                                                        <button type="submit"
                                                            className="fw-btn-fill btn-gradient-yellow">SEARCH</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="table-responsive result-table-box">
                                                <table className="table display data-table text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <div className="form-check">
                                                                    <input type="checkbox"
                                                                        className="form-check-input checkAll" />
                                                                    <label className="form-check-label">ID</label>
                                                                </div>
                                                            </th>
                                                            <th>Exam Name</th>
                                                            <th>Subject</th>
                                                            <th>Grade</th>
                                                            <th>Percent</th>
                                                            <th>Date</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0021</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>English</td>
                                                            <td>A</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0022</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>English</td>
                                                            <td>A</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0023</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>Chemistry</td>
                                                            <td>A</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0024</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>English</td>
                                                            <td>A</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0025</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>Chemistry</td>
                                                            <td>A</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0025</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>Chemistry</td>
                                                            <td>D</td>
                                                            <td>70.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0025</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>English</td>
                                                            <td>C</td>
                                                            <td>80.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0025</label>
                                                                </div>
                                                            </td>
                                                            <td>Class Test</td>
                                                            <td>English</td>
                                                            <td>B</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" />
                                                                    <label className="form-check-label">#0025</label>
                                                                </div>
                                                            </td>
                                                            <td>First Semister</td>
                                                            <td>English</td>
                                                            <td>A</td>
                                                            <td>99.00 > 100</td>
                                                            <td>22/02/2019</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="#" className="dropdown-toggle"
                                                                        data-toggle="dropdown" aria-expanded="false">
                                                                        <span
                                                                            className="flaticon-more-button-of-three-dots"></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-times text-orange-red"></i>Close</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                                        <a className="dropdown-item" href="#"><i
                                                                                className="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4-xxxl col-xl-6 col-12">
                        <div className="card dashboard-card-three">
                            <div className="card-body">
                                <div className="heading-layout1">
                                    <div className="item-title">
                                        <h3>Attendence</h3>
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
                                <div className="doughnut-chart-wrap">
                                    <canvas id="student-doughnut-chart" width="100" height="270"></canvas>
                                </div>
                                <div className="student-report">
                                    <div className="student-count pseudo-bg-blue">
                                        <h4 className="item-title">Absent</h4>
                                        <div className="item-number">28.2%</div>
                                    </div>
                                    <div className="student-count pseudo-bg-yellow">
                                        <h4 className="item-title">Present</h4>
                                        <div className="item-number">65.8%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4-xxxl col-xl-6 col-12">
                        <div className="card dashboard-card-thirteen">
                            <div className="card-body">
                                <div className="heading-layout1">
                                    <div className="item-title">
                                        <h3>Event Calender</h3>
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
                                <div className="calender-wrap">
                                    <FullCalendar
                                        plugins={[ dayGridPlugin ]}
                                        initialView="dayGridMonth"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4-xxxl col-12">
                        <div className="card dashboard-card-six">
                            <div className="card-body">
                                <div className="heading-layout1 mg-b-17">
                                    <div className="item-title">
                                        <h3>Notifications</h3>
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
                                <div className="notice-box-wrap">
                                    <div className="notice-list">
                                        <div className="post-date bg-skyblue">16 June, 2019</div>
                                        <h6 className="notice-title"><a href="#">Great School manag mene esom tus eleifend
                                                lectus
                                                sed maximus mi faucibusnting.</a></h6>
                                        <div className="entry-meta"> Jennyfar Lopez / <span>5 min ago</span></div>
                                    </div>
                                    <div className="notice-list">
                                        <div className="post-date bg-yellow">16 June, 2019</div>
                                        <h6 className="notice-title"><a href="#">Great School manag printing.</a></h6>
                                        <div className="entry-meta"> Jennyfar Lopez / <span>5 min ago</span></div>
                                    </div>
                                    <div className="notice-list">
                                        <div className="post-date bg-pink">16 June, 2019</div>
                                        <h6 className="notice-title"><a href="#">Great School manag Nulla rhoncus eleifensed
                                                mim
                                                us mi faucibus id. Mauris vestibulum non purus lobortismenearea</a></h6>
                                        <div className="entry-meta"> Jennyfar Lopez / <span>5 min ago</span></div>
                                    </div>
                                    <div className="notice-list">
                                        <div className="post-date bg-skyblue">16 June, 2019</div>
                                        <h6 className="notice-title"><a href="#">Great School manag mene esom text of the
                                                printing.</a></h6>
                                        <div className="entry-meta"> Jennyfar Lopez / <span>5 min ago</span></div>
                                    </div>
                                    <div className="notice-list">
                                        <div className="post-date bg-yellow">16 June, 2019</div>
                                        <h6 className="notice-title"><a href="#">Great School manag printing.</a></h6>
                                        <div className="entry-meta"> Jennyfar Lopez / <span>5 min ago</span></div>
                                    </div>
                                    <div className="notice-list">
                                        <div className="post-date bg-pink">16 June, 2019</div>
                                        <h6 className="notice-title"><a href="#">Great School manag meneesom.</a></h6>
                                        <div className="entry-meta"> Jennyfar Lopez / <span>5 min ago</span></div>
                                    </div>
                                </div>
                            </div>
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
export default StudentDetails;