import React from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    Input,
    Label,
    FormGroup,
    Alert
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../features/services/user.service"
import { Link, Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Login = () => {
  const dispatch = useDispatch()
  const { user, loading, errMessage } = useSelector((state) => state.user)
  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please provide your username, E-mail or Student ID"),
    password: Yup.string().required("Please provide a valid password")
  })

  const signIn = (values) => {
    dispatch(login(values))
  }

  if(loading) return (<div id="preloader"></div>)
  if(user.isSuperuser) return (<Navigate to="/admin/dashboard" />)
  return (
      <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="login-page-wrap">
            <div className="login-page-content">
                <div className="login-box">
                    <div className="item-logo">
                        <img src="../img/logo2.png" alt="logo" />
                    </div>
                    <Formik 
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={values => {
                        signIn(values)
                      }}
                      >
                       { 
                        ({ errors, touched}) => (
                            <Form className="login-form" noValidate>
                              { errMessage ? 
                                <Alert color="danger">
                                  {errMessage}
                                </Alert>: ""}
                              <FormGroup className="form-group">
                                  <Label>Username</Label>
                                  <Field name="username" 
                                    type="text" 
                                    placeholder="Enter your username, ID or email" 
                                    className={`form-control ${touched.username && errors.username ? "is-invalid": ""}`} />
                                  <i className="far fa-user"></i>
                                  <ErrorMessage component="p" name="username"
                                              className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                              </FormGroup>
                              <FormGroup className="form-group">
                                  <Label>Password</Label>
                                  <Field name="password" type="password" placeholder="Enter password" className={`form-control ${touched.password && errors.password ? "is-invalid": ""}`} />
                                  <i className="fas fa-lock"></i>
                                  <ErrorMessage component="p" name="password"
                                              className="invalid-feedback" style={{fontSize: "12px", fontStyle: "italic"}} />
                              </FormGroup>
                              <FormGroup className="form-group d-flex align-items-center justify-content-between">
                                  <a href="#" className="forgot-btn">Forgot Password?</a>
                              </FormGroup>
                              <FormGroup className="form-group">
                                  <Input type="submit" className="login-btn" value="Login" />
                              </FormGroup>
                          </Form>
                          )
                        }
                    
                    </Formik>
                </div>
                <div className="sign-up" style={{fontSize: "14px"}}>Don't have an account ? <Link to="/account/register">Signup now!</Link></div>
                
            </div>
        </div>
      </>
    
  )
}

export default Login

