import React, { useState } from 'react'
import * as Yup from 'yup';
import moment from "moment"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SelectField from '../customInputs/SelectField';
import CreatableSelectField from "../customInputs/CreatableSelectField";
import PhoneField from '../customInputs/PhoneInput';
import {
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Label,
    Row,
    Col
} from "reactstrap"

import Sidebar from '../layouts/Sidebar'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

import { Helmet } from 'react-helmet';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { addStudent } from "../../features/services/studentMgt.service"

const StudentUpdate = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { student } = location.state
    const { mobileNavOpened } = useSelector((state)=> state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)
    const { status } = useSelector((state) => state.studentMgt)
    const [isMenuOpened, setMenuOpenStatus] = useState(false)
    const [inputTypeChange, changeInputType] = useState(false)
    console.log(student)
    const genderOptions = [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"},
        {value: "others", label: "Others"}
    ]
    const bloodGroupOptions = [
        {value: "A+", label: "A+"},
        {value: "A-", label: "A-"},
        {value: "AB+", label: "AB+"},
        {value: "AB-", label: "AB-"},
        {value: "B+", label: "B+"},
        {value: "B-", label: "B-"},
        {value: "O+", label: "O+"},
        {value: "O-", label: "O-"}
    ]
    
    const religionOptions = [
        {value: "islam", label: "Islam"},
        {value: "christianity", label: "Christianity"},
        {value: "buddhism", label: "Buddhism"},
        {value: "hinduism", label: "Hinduism"},
        {value: "others", label: "others"}
    ]

    const classOptions = [
        {value: "daycare", label: "DayCare"},
        {value: "pre-kg", label: "Pre-KG"},
        {value: "primary one", label: 'Primary One'},
        {value: "primary two", label: "Primary Two"},
        {value: "primary three", label: "Primary Three"},
        {value: "primary four", label: "Primary Four"},
        {value: "primary five", label: "Primary Five"},
        {value: "jss one", label: "JSS One"},
        {value: "jss two", label: "JSS Two"},
        {value: "jss three", label: "JSS Three"},
        {value: "sss one", label: "SSS One"},
        {value: "sss two", label: "SSS Two"},
        {value: "sss three", label: "SSS Three"}
    ]

    const sectionOptions = [
        {value: "daisy", label: "Daisy"},
        {value: "iris", label: "Iris"},
        {value: "lily", label: "Lily"},
        {value: "rose", label: "Rose"},
    ]

    const relationshipOptions = [
        {value: "parent", label: "Parent"},
        {value: "grandparent", label: "Grand Parent"},
        {value: "husband", label: "Husband"},
        {value: "wife", label: "Wife"},
        {value: "sibling", label: "Sibling"},
        {value: "uncle", label: "Uncle"},
        {value: "aunt", label: "Aunt"}
    ]
    const initialValues = {
        firstName: student.detail.firstName,
        lastName:student.detail.lastName,
        gender:student.detail.gender,
        dateOfBirth:moment(student.dateOfBirth).format("YYYY-MM-DD"),
        roll: student.classRole,
        bloodGroup: student.bloodGroup,
        religion: student.religion,
        email:student.detail.email,
        class: student.class.name,
        section: student.class.code_name,
        admissionID: student.admissionID,
        phone: student.detail.phone,
        bio: student.bio,
        profilePhoto: "",
        kinFirstName: student.nextOfKin.firstName,
        kinLastName: student.nextOfKin.lastName,
        kinRelation: student.nextOfKin.relationship,
        kinPhone: student.nextOfKin.phone,
        kinAddress: student.nextOfKin.address
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Enter student's first Name"),
        lastName: Yup.string().required("Enter student's last Name"),
        gender: Yup.string().required("Enter Student's Gender"),
        dateOfBirth: Yup.date("Enter a valid date of the form mm/dd/yyyy").required("Enter Student's date of birth"),
        roll: Yup.string(),
        bloodGroup: Yup.string(),
        religion: Yup.string(),
        email: Yup.string().email("Enter a valid email address"),
        class: Yup.string().required("Enter the student's class"),
        section: Yup.string(),
        admissionID: Yup.string(),
        phone: Yup.string(),
        bio: Yup.string(),
        profilePhoto: Yup.mixed(),
        kinFirstName: Yup.string().required("Enter Next of kin's First Name"),
        kinLastName: Yup.string().required("Enter Next of kin's Lastname"),
        kinRelation: Yup.string().required("Enter Relationship with kin"),
        kinPhone: Yup.string().required("Enter next of kin's phone number"),
        kinAddress: Yup.string().required("Enter next of Kin's address")

    })

    const updateStudent = (values) => {
        dispatch(addStudent(values))
    }
   
  if(status === 201) return(<Navigate to="/admin/students" />)
  return (
    <>
        <Helmet>
            <title>Add Students</title>
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
                                <Link to="/">Home</Link>
                            </li>
                            <li>Update Student Details</li>
                        </ul>
                    </div>

                    <div className="card height-auto">
                        <div className="card-body">
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h3>Update Student Details</h3>
                                </div>
                            </div>
                            <Formik initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values, {resetForm}) => {
                                    updateStudent(values);
                                    resetForm()
                                }}>
                                    {
                                        ({errors, touched}) => (
                                            <Form className="new-added-form" style={{fontSize: "16px"}}>
                                                <div className="ui-alart-box">
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
                                                <Row>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>First Name *</Label>
                                                        <Field name="firstName" type="text" placeholder="First Name" className={`form-control ${touched.firstName && errors.firstName ? "is-invalid": ""}`} />
                                                        <ErrorMessage 
                                                            component="p" 
                                                            name="firstName"
                                                            className="invalid-feedback" 
                                                            style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Last Name *</Label>
                                                        <Field name="lastName" type="text" placeholder="Last Name" className={`form-control ${touched.lastName && errors.lastName ? "is-invalid": ""}`} />
                                                        <ErrorMessage 
                                                            component="p" 
                                                            name="lastName"
                                                            className="invalid-feedback" 
                                                            style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Gender *</Label>
                                                        {/* <Select options={genderOptions} className="form-control" /> */}
                                                        <Field 
                                                            component={SelectField} 
                                                            options={genderOptions} 
                                                            type="select" 
                                                            name="gender" 
                                                            placeholder="Select Gender *" 
                                                            className={`selecet2 form-control ${touched.gender && errors.gender ? "is-invalid": ""}`} />
                                                        <ErrorMessage 
                                                            component="p" 
                                                            name="gender"
                                                            className="invalid-feedback" 
                                                            style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Date Of Birth *</Label>
                                                        <Field 
                                                            name="dateOfBirth" 
                                                            type="text" 
                                                            placeholder="mm/dd/yyyy" 
                                                            data-position='bottom right' 
                                                            className={`form-control air-datepicker ${touched.dateOfBirth && errors.dateOfBirth ? "is-invalid": ""}`} />
                                                            <i className="far fa-calendar-alt"></i>
                                                            <ErrorMessage 
                                                                component="p" 
                                                                name="dateOfBirth"
                                                                className="invalid-feedback" 
                                                                style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Roll</Label>
                                                        <Field name="roll" type="text" placeholder="" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Blood Group *</Label>
                                                        <Field 
                                                            component={SelectField} 
                                                            options={bloodGroupOptions} 
                                                            type="select" 
                                                            name="bloodGroup" 
                                                            placeholder="Select Blood Group*" 
                                                            className={`form-control select2 ${touched.bloodGroup && errors.bloodGroup ? "is-invalid": ""}`} />
                                                            <ErrorMessage 
                                                                component="p" 
                                                                name="bloodGroup"
                                                                className="invalid-feedback" 
                                                                style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Religion *</Label>
                                                        <Field 
                                                            component={SelectField}
                                                            options={religionOptions}
                                                            type="select"
                                                            name="religion"
                                                            placeholder="Select Religion*"
                                                            className={`select2 form-control ${touched.religion && errors.religion ? "is-invalid": ""}`} />
                                                            <ErrorMessage 
                                                                component="p" 
                                                                name="religion"
                                                                className="invalid-feedback" 
                                                                style={{fontSize: "12px", fontStyle: "italic"}} />
                                                       
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>E-Mail</Label>
                                                        <Field 
                                                            name="email" 
                                                            type="email" 
                                                            placeholder="" 
                                                            className={`form-control ${touched.email && errors.email ? "is-invalid": ""}`} />
                                                        <ErrorMessage 
                                                            component="p" 
                                                            name="email"
                                                            className="invalid-feedback" 
                                                            style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Class *</Label>
                                                        <Field 
                                                            component={CreatableSelectField}
                                                            options={classOptions}
                                                            type="select"
                                                            name="class"
                                                            placeholder="Select Class*"
                                                            className={`select2 form-control ${touched.class && errors.class ? "is-invalid": ""}`} />
                                                            <ErrorMessage 
                                                                component="p" 
                                                                name="class"
                                                                className="invalid-feedback" 
                                                                style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Section *</Label>
                                                        <Field 
                                                            component={CreatableSelectField}
                                                            options={sectionOptions}
                                                            type="select"
                                                            name="section"
                                                            placeholder="Select Section*"
                                                            className={`select2 form-control ${touched.section && errors.section ? "is-invalid": ""}`} />
                                                            <ErrorMessage 
                                                                component="p" 
                                                                name="section"
                                                                className="invalid-feedback" 
                                                                style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Admission ID</Label>
                                                        <Field 
                                                            name="admissionID" 
                                                            type="text" 
                                                            placeholder="" 
                                                            className={`form-control ${touched.admissionID && errors.admissionID ? "is-invalid": ""}`} />
                                                            <ErrorMessage 
                                                                component="p" 
                                                                name="admissionID"
                                                                className="invalid-feedback" 
                                                                style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-3 col-lg-6 col-12 form-group">
                                                        <Label>Phone</Label>
                                                        <Field 
                                                            name="phone" 
                                                            component={PhoneField} 
                                                            type="text" 
                                                            international 
                                                            countryCallingCodeEditable={false} 
                                                            defaultCountry="NG" 
                                                            className={`form-control ${touched.phone && errors.phone ? "is-invalid": ""}`} />
                                                        <ErrorMessage 
                                                            component="p" 
                                                            name="phone"
                                                            className="invalid-feedback" 
                                                            style={{fontSize: "12px", fontStyle: "italic"}} />
                                                    </FormGroup>
                                                    <FormGroup className="col-lg-6 col-12 form-group">
                                                        <Label>Short BIO</Label>
                                                        <textarea className="textarea form-control" name="bio" id="form-message" cols="10"
                                                            rows="9"></textarea>
                                                    </FormGroup>
                                                    <FormGroup className="col-lg-6 col-12 form-group mg-t-30">
                                                        <Label className="text-dark-medium">Upload Student Photo (150px X 150px)</Label>
                                                        <Input name="profilePhoto" type="file" className="form-control-file" />
                                                    </FormGroup>

                                                    <div className="heading-layout1 mt-5 border-top border-bottom">
                                                        <div className="item-title mt-4 mb-4">
                                                            <h3>Next of Kin Details</h3>
                                                        </div>
                                                    </div>

                                                    <FormGroup className="col-xl-4 col-lg-6 col-12 form-group">
                                                        <Label>First Name *</Label>
                                                        <Field name="kinFirstName" type="text" placeholder="First Name" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-4 col-lg-6 col-12 form-group">
                                                        <Label>Last Name *</Label>
                                                        <Field name="kinLastName" type="text" placeholder="Last Name" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-4 col-lg-6 col-12 form-group">
                                                        <Label>Relationship *</Label>
                                                        {/* <Select options={genderOptions} className="form-control" /> */}
                                                        <Field component={SelectField} options={relationshipOptions} type="select" className="select2 form-control" name="kinRelation" placeholder="Select Relationship *" />
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-4 col-lg-6 col-12 form-group">
                                                        <Label>Phone *</Label>
                                                        <Field name="kinPhone" component={PhoneField} type="text" international countryCallingCodeEditable={false} defaultCountry="NG" className="form-control"/>
                                                    </FormGroup>
                                                    <FormGroup className="col-xl-4 col-lg-6 col-12 form-group">
                                                        <Label>Address</Label>
                                                        <Field name="kinAddress" type="text" placeholder="Next of Kin's address" className="form-control" />
                                                    </FormGroup>


                                                    <FormGroup className="col-12 form-group mg-t-8">
                                                        <button type="submit" className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">Update</button>
                                                        
                                                    </FormGroup>
                                                </Row>
                                            </Form>
                                        )
                                    }
                            
                            </Formik>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    </>
  )
}

export default StudentUpdate