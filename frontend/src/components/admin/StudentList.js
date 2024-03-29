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
import { Link } from 'react-router-dom'
import { studentList } from "../../features/services/studentMgt.service"

const StudentList = () => {
    const dispatch = useDispatch()
    const { mobileNavOpened } = useSelector((state)=> state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)
    const { status, students } = useSelector((state)=> state.studentMgt)
    const [isMenuOpened, setMenuOpenStatus] = useState(false)
    const [isActionOpened, setIsActionStatus] = useState(false)
    const [actionID, setActionID] = useState("")
    const [rollToSearch, setRollToSearch] = useState("")
    const [nameToSearch, setNameToSearch] = useState("")
    const [classToSearch, setClassToSearch] = useState("")
    
    const setStatus = (values) => {
        setActionID(values.detail._id)
    }
    
    const searchByRoll = (e) => {
        setRollToSearch(e.target.value)
        
    }
    
    const searchByName = (e) => {
        setNameToSearch(e.target.value)
    }
    
    const searchByClass = (e) => {
        setClassToSearch(e.target.value)
    }
    
    const closeActionMenu = () => {
        setActionID("")
    }
    useEffect(() => {
        dispatch(studentList())
    }, [])
    const columns = [
        {
              name: '#',
              cell: (row, index) => index + 1,
            },
        {
            name: "Admission ID",
            cell: (row) => {
                return (
                    <Link to={`/admin/students/details/${row.admissionID}/${row.detail._id}`} state={{ student: row }}>{row.admissionID}</Link>
                )
            },
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
                  <Dropdown tag="div" isOpen={actionID === record.detail._id ? true : false}>
                    <DropdownToggle 
                        tag="a" 
                        ariaExpanded="false" 
                        style={{fontSize: "36px", textDecoration: "none", color: "#bcbcbc"}}
                        onClick={() => setStatus(record)}
                        >
                        <span className="flaticon-more-button-of-three-dots"></span>
                    </DropdownToggle>
                    <DropdownMenu right={true}>
                        <DropdownItem onClick={() => closeActionMenu()}>
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
    
    const persons = students.data
    const dataFilter = (persons) => {
        let data;
        
        if ((!rollToSearch && !classToSearch) && nameToSearch) {
            data = persons.filter(student =>  
                    student.detail.firstName.toLowerCase()
                    .includes(nameToSearch.toLowerCase()) || 
                    student.detail.lastName.toLowerCase()
                    .includes(nameToSearch.toLowerCase())
                    );
        } else if((classToSearch && nameToSearch) && !rollToSearch) {
            data = persons.filter(student =>  
                    (student.detail.firstName.toLowerCase().includes(nameToSearch.toLowerCase()) || 
                    student.detail.lastName.toLowerCase().includes(nameToSearch.toLowerCase())) && 
                    student.class.name.toLowerCase().includes(classToSearch.toLowerCase()))
        } else if ((!rollToSearch && !nameToSearch) && classToSearch) {
            data = persons.filter(student => 
                     student.class.name.toLowerCase()
                     .includes(classToSearch.toLowerCase()));
        } else if ((!classToSearch && !nameToSearch) && rollToSearch) {
            data = persons.filter(student => 
                    student.admissionID.toLowerCase()
                    .includes(rollToSearch.toLowerCase()));
                    
        } else if ((rollToSearch && nameToSearch) && !classToSearch) {
            data = persons.filter(student => 
                (
                    student.detail.firstName.toLowerCase()
                        .includes(nameToSearch.toLowerCase()) || 
                    student.detail.lastName.toLowerCase()
                        .includes(nameToSearch.toLowerCase())
                ) && 
                student.admissionID.toLowerCase().includes(rollToSearch.toLowerCase())
            );
        } else if ((rollToSearch && classToSearch) && !nameToSearch) {
            data = persons.filter(student => 
                student.admissionID.toLowerCase()
                    .includes(rollToSearch.toLowerCase()) && 
                student.class.name.toLowerCase().includes(classToSearch.toLowerCase())
            );
        } else if (rollToSearch && classToSearch && nameToSearch) {
            data = persons.filter(student => 
                (
                    student.detail.firstName.toLowerCase()
                        .includes(nameToSearch.toLowerCase()) || 
                    student.detail.lastName.toLowerCase()
                        .includes(nameToSearch.toLowerCase())
                ) && 
                student.admissionID.toLowerCase().includes(rollToSearch.toLowerCase()) &&
                student.class.name.toLowerCase().includes(classToSearch.toLowerCase())
            );
        } else if (!nameToSearch && !classToSearch && !rollToSearch) {
            data = persons
        }
        return data
    }
    const data = dataFilter(persons)

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
                            <Input type="text" placeholder="Search by Roll ..." className="form-control" onChange={searchByRoll} />
                        </div>
                        <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group">
                            <Input type="text" placeholder="Search by Name ..." className="form-control" onChange={searchByName}/>
                        </div>
                        <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
                            <Input type="text" placeholder="Search by Class ..." className="form-control" onChange={searchByClass}/>
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
                        pagination
                        // selectableRowsComponent={selectableRowsComp}
                        />
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