import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    Nav,
    NavItem,
    // NavLink
} from "reactstrap"
import { NavLink } from "react-router-dom"
import { toggleSubmenu, highlightActiveMenu } from "../../features/layout"

const Sidebar = () => {
    const dispatch = useDispatch()
    const { subMenuToShow, activeMenu } = useSelector((state)=> state.layout)

  return (
    <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
               <div className="mobile-sidebar-header d-md-none">
                    <div className="header-logo">
                        <a href="index.html"><img src="../../img/logo1.png" alt="logo" /></a>
                    </div>
               </div>
                <div className="sidebar-menu-content">
                    <Nav className={`nav-sidebar-menu sidebar-toggle-view`}>
                        <NavItem onClick={()=> dispatch(highlightActiveMenu("dashboard"))}>
                            <NavLink to="/admin/dashboard" className={`nav-link ${activeMenu === "dashboard" ? "menu-active" : ""}`}>
                                <i className="flaticon-dashboard"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "students" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('students'))}>
                            <NavLink to="#" className={`nav-link ${({ isActive }) => isActive ? "menu-active": ""}`}><i className="flaticon-classmates"></i><span>Students</span></NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "students" ? "menu-open" : ""}`} style={subMenuToShow === "students" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="/admin/students" className={`nav-link ${activeMenu == "all students" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("all students"))}>
                                        <i className="fas fa-angle-right"></i>All Students</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "student details" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("student details"))}>
                                        <i className="fas fa-angle-right"></i>Student Details</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/admin/students/add" className={`nav-link ${activeMenu == "admission form" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("admission form"))}><i className="fas fa-angle-right"></i>Admission Form</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "student promotion" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("student promotion"))}><i className="fas fa-angle-right"></i>Student Promotion</NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "teachers" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('teachers'))}>
                            <NavLink to="#" className="nav-link">
                                <i className="flaticon-multiple-users-silhouette"></i>
                                <span>Teachers</span>
                            </NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "teachers" ? "menu-open" : ""}`} style={subMenuToShow === "teachers" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "all teachers" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("all teachers"))}>
                                        <i className="fas fa-angle-right"></i>
                                        All Teachers
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "teacher details" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("teacher details"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Teacher Details
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "add teacher" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("add teacher"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Add Teacher
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "payment" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("payment"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Payment
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "parents" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('parents'))}>
                            <NavLink to="#" className={`nav-link ${({ isActive }) => isActive ? "menu-active": ""}`}>
                                <i className="flaticon-couple"></i>
                                <span>Parents</span>
                            </NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "parents" ? "menu-open" : ""}`} style={subMenuToShow === "parents" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "all parents" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("all parents"))}>
                                        <i className="fas fa-angle-right"></i>
                                        All Parents
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "parent details" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("parent details"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Parents Details
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "add parent" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("add parent"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Add Parent
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "library" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('library'))}>
                            <NavLink to="#" className="nav-link">
                                <i className="flaticon-books"></i>
                                <span>Library</span>
                            </NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "library" ? "menu-open" : ""}`} style={subMenuToShow === "library" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "all books" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("all books"))}>
                                        <i className="fas fa-angle-right"></i>
                                        All Book
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "new book" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("new book"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Add New Book
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "accounts" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('accounts'))}>
                            <NavLink to="#" className={`nav-link ${({ isActive }) => isActive ? "menu-active": ""}`}><i className="flaticon-technological"></i><span>Account</span></NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "accounts" ? "menu-open" : ""}`} style={subMenuToShow === "accounts" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "fee collection" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("fee collection"))}>
                                        <i className="fas fa-angle-right"></i>All Fees Collection
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "expenses" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("expenses"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Expenses
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "add expenses" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("add expenses"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Add Expenses
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "classes" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('classes'))}>
                            <NavLink to="#" className="nav-link">
                                <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler"></i>
                                <span>Class</span>
                            </NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "classes" ? "menu-open" : ""}`} style={subMenuToShow === "classes" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "all classes" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("all classes"))}>
                                        <i className="fas fa-angle-right"></i>
                                        All Classes
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "add class" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("add class"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Add New Class
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "subjects" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("subjects"))}>
                                <i className="flaticon-open-book"></i><span>Subject</span></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "class routine" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("class routine"))}>
                                <i className="flaticon-calendar"></i>
                                <span>Class Routine</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="" className={`nav-link ${activeMenu == "attendance" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("attendance"))}>
                                <i className="flaticon-checklist"></i>
                                <span>Attendence</span>
                            </NavLink>
                        </NavItem>
                        <NavItem className={`sidebar-nav-item ${subMenuToShow === "exam" ? "active" : ""}`} onClick={() => dispatch(toggleSubmenu('exam'))}>
                            <NavLink to="#" className="nav-link">
                                <i className="flaticon-shopping-list"></i>
                                <span>Exam</span>
                            </NavLink>
                            <Nav className={`sub-group-menu ${subMenuToShow === "exam" ? "menu-open" : ""}`} style={subMenuToShow === "exam" ? {display: "block"} : {display: "none"}}>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "exam schedule" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("exam schedule"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Exam Schedule
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={`nav-link ${activeMenu == "exam grade" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("exam grade"))}>
                                        <i className="fas fa-angle-right"></i>
                                        Exam Grades
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "transport" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("transport"))}>
                                <i className="flaticon-bus-side-view"></i>
                                <span>Transport</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "hostel" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("hostel"))}>
                                <i className="flaticon-bed"></i>
                                <span>Hostel</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "notice" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("notice"))}>
                                <i className="flaticon-script"></i>
                                <span>Notice</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "message" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("message"))}>
                                <i className="flaticon-chat"></i>
                                <span>Message</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "map" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("map"))}>
                                <i className="flaticon-planet-earth"></i>
                                <span>Map</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#" className={`nav-link ${activeMenu == "user mgt" ? "menu-active": ""}`} onClick={()=> dispatch(highlightActiveMenu("user mgt"))}>
                                <i className="flaticon-settings"></i>
                                <span>User Management</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>
  )
}

export default Sidebar