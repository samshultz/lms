import React from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    // Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from 'reactstrap'

import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from "react-router-dom";
// import logo from "../../pioneerlogo1.png"
import { register } from "../../features/services/user.service"


const Register = () => {
    const { user, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const initialValues = {
        schoolName: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "male",
        password: "",
        confirmPassword: ""
    }
    const validationSchema = Yup.object().shape({
        schoolName: Yup.string().required("School name is required"),
        username: Yup.string().min(6, "Username must have a minimum of 6 characters")
            .required("Username is required"),
        email: Yup.string().email("Invalid Email address"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required('Last Name is required'),
        gender: Yup.string().default(() => "male"),
        password: Yup.string().min(8, "Password must have a minimum of 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')

    })

    const signUP = (values) => {
        dispatch(register(values))
    }
    if(loading) return (<div id="preloader"></div>)
    if(user.isSuperuser) return (<Navigate to="/admin/dashboard" />)
  return (
      <>
        <Helmet>
            <title>Register</title>
        </Helmet>
        <div className="login-page-wrap" style={{overflow: "scroll"}}>
        <div className="login-page-content">
            <div className="login-box" style={{marginTop: "120px"}}>
                <div className="item-logo">
                    <img src="../img/logo2.png" alt="logo" />
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        signUP(values)
                    }}
                    >
                        {
                            ({ errors, touched }) => (
                                <Form className="login-form" noValidate>
                                    <FormGroup className="form-group">
                                        <Label>School Name</Label>
                                        <Field name="schoolName" type="text" placeholder="Enter the name of your school" className={`form-control ${touched.schoolName && errors.schoolName ? "is-invalid": ""}`} />
                                        <i className="fas fa-home"></i>
                                        <ErrorMessage component="p" name="schoolName"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                    </FormGroup>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="form-group">
                                                <Label>Username</Label>
                                                <Field name="username" type="text" placeholder="Enter your username" className={`form-control ${touched.username && errors.username ? "is-invalid": ""}`} />
                                                <i className="far fa-user"></i>
                                                <ErrorMessage component="p" name="username"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="form-group">
                                                <Label>Email(<small className="text-muted">optional</small>)</Label>
                                                <Field name="email" type="email" placeholder="Email" className={`form-control ${touched.email && errors.email ? "is-invalid": ""}`} />
                                                <i className="far fa-envelope"></i>
                                                <ErrorMessage component="p" name="email"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="form-group">
                                                <Label>First Name</Label>
                                                <Field name='firstName' type="text" placeholder="Enter your First Name" className={`form-control ${touched.firstName && errors.firstName ? "is-invalid": ""}`} />
                                                <i className="far fa-user"></i>
                                                <ErrorMessage component="p" name="firstName"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="form-group">
                                                <Label>Last Name</Label>
                                                <Field name="lastName" type="text" placeholder="Enter your Last Name" className={`form-control ${touched.lastName && errors.lastName ? "is-invalid": ""}`} />
                                                <i className="far fa-user"></i>
                                                <ErrorMessage component="p" name="lastName"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup className="form-group">
                                        <Label>Gender</Label>
                                        <Input type="select" className="form-control select2">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </Input>
                                        <i className="far fa-gender"></i>
                                    </FormGroup>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="form-group">
                                                <Label>Password</Label>
                                                <Field name="password" type="password" placeholder="Enter password" className={`form-control ${touched.password && errors.password ? "is-invalid": ""}`} />
                                                <i className="fas fa-lock"></i>
                                                <ErrorMessage component="p" name="password"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="form-group">
                                                <Label>Confirm Password</Label>
                                                <Field name="confirmPassword" type="password" placeholder="Re-type your password" className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid": ""}`} />
                                                <i className="fas fa-lock"></i>
                                                <ErrorMessage component="p" name="confirmPassword"
                                            className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <FormGroup className="form-group d-flex align-items-center justify-content-between">
                                    <div className="sign-up text-dark" style={{fontSize: "14px"}}>Already have an account ? <Link className="text-danger" to="/account/login">Login now!</Link></div>
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <Input type="submit" className="login-btn" value="Sign Up" />
                                    </FormGroup>
                                </Form>
                            )
                        }
                
                </Formik>
            </div>
            
            
        </div>
        </div>
      </>
      
  )
}

export default Register