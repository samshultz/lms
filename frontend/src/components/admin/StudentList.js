import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import moment from "moment"
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component';

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

import { studentList } from "../../features/services/studentMgt.service"

const StudentList = () => {
    const dispatch = useDispatch()
    const { mobileNavOpened } = useSelector((state)=> state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)
    const { status, students } = useSelector((state)=> state.studentMgt)
    const [isMenuOpened, setMenuOpenStatus] = useState(false)
    const [isActionOpened, setIsActionStatus] = useState(false)

    const setStatus = (values) => {
        console.log(values)
    }
    useEffect(() => {
        dispatch(studentList())
    }, [])
    const columns = [
        {
            name: "Admission ID",
            selector: row => row.admissionID,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Photo",
            selector: row => row.detail.img,
            reorder: true
        },
        {
            name: "First Name",
            selector: row => row.detail.firstName,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Last Name",
            selector: row => row.detail.lastName,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Class",
            selector: row => row.class.name
        },
        {
            name: "Section",
            selector: row => row.class.code_name,
            reorder: true,
            sortable: true
        },
        {
            name: "Next of Kin",
            selector: row => `${row.nextOfKin.firstName} ${row.nextOfKin.lastName}`
        },
        {
            name: "Date of Birth",
            selector: row => moment(row.dateOfBirth).format("DD/MM/YYYY"),
            grow: 3,
            reorder: true,
            sortable: true
        },
        {
            name: "Gender",
            selector: row => row.detail.gender,
            reorder: true
        },
        {
            name: "Phone",
            selector: row => row.detail.phone,
            reorder: true,
            grow: 3
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: 100,
            align: "left",
            sortable: false,
            cell: (record) => {
              return (
                <>
                  <Dropdown tag="div">
                    <DropdownToggle 
                        tag="a" 
                        ariaExpanded="false" 
                        style={{fontSize: "36px", textDecoration: "none", color: "#bcbcbc"}}
                        onClick={() => setStatus(record)}
                        >
                        <span className="flaticon-more-button-of-three-dots"></span>
                    </DropdownToggle>
                    <DropdownMenu right={true}>
                        <DropdownItem>
                            <i className="fas fa-times text-orange-red"></i>
                            Close
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fas fa-cogs text-dark-pastel-green"></i>
                            Edit
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fas fa-redo-alt text-orange-peel"></i>
                            Refresh
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </>
              );
             },
            },
    ]
    const data = students.data

    const selectableRowsComp = React.forwardRef(({ onClick, ...rest }, ref) => (
            <div className="form-check">
                <Input 
                    type="checkbox"
                    htmlFor="slect"
                    className="form-check-input" 
                    ref={ref}
                    onClick={onClick}
                    {...rest}
                    />
                <Label className="form-check-label" id="slect" check>Roll</Label>
            </div>
      ));
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

            <div className="ui-alart-box" style={{fontSize: "16px"}}>
                    <div className="icon-color-alart">
                        {
                            status === 201 ?
                        
                                <div className="alert icon-alart bg-light-green2" role="alert">
                                    <i className="far fa-hand-point-right bg-light-green3"></i>
                                    Student Added Successfully
                                </div>
                            : status === 400 ?
                                <div className="alert icon-alart bg-pink2" role="alert">
                                    <i className="fas fa-times bg-pink3"></i>
                                    Attention! Student couldn't be added, correct the errors below!!!
                                </div>
                                : ""
                        }
                    </div>
                </div>

                <div className="heading-layout1">
                    <div className="item-title">
                        <h3>All Students Data</h3>
                    </div>
                    <Dropdown className="dropdown" isOpen={isMenuOpened}>
                        <DropdownToggle tag="a" role="button" style={{fontSize: "36px", textDecoration: "none", color: "#bcbcbc"}} aria-expanded="false" onClick={() => setMenuOpenStatus(!isMenuOpened) }>...</DropdownToggle>

                        <DropdownMenu right={true}>
                            <DropdownItem tag="a">
                                <i className="fas fa-times text-orange-red"></i>
                                Close
                            </DropdownItem>
                            <DropdownItem tag="a">
                                <i className="fas fa-cogs text-dark-pastel-green"></i>
                                Edit
                            </DropdownItem>
                            <DropdownItem tag="a">
                                <i className="fas fa-redo-alt text-orange-peel"></i>
                                Refresh
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
                    <DataTable
                        className="table display data-table text-nowrap"
                        columns={columns} 
                        data={data}
                        keyField="_id"
                        responsive
                        striped
                        selectableRows
                        // selectableRowsComponent={selectableRowsComp}
                        />
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