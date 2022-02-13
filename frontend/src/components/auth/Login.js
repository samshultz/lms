import React from 'react'
import {
    Form,
    Input,
    Label,
    FormGroup,
} from 'reactstrap';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page-wrap">
        <div className="login-page-content">
            <div className="login-box">
                <div className="item-logo">
                    <img src="../img/logo2.png" alt="logo" />
                </div>
                <Form className="login-form">
                    <FormGroup className="form-group">
                        <Label>Username</Label>
                        <Input type="text" placeholder="Enter your username, ID or email" className="form-control" />
                        <i className="far fa-envelope"></i>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label>Password</Label>
                        <Input type="text" placeholder="Enter password" className="form-control" />
                        <i className="fas fa-lock"></i>
                    </FormGroup>
                    <FormGroup className="form-group d-flex align-items-center justify-content-between">
                        <a href="#" className="forgot-btn">Forgot Password?</a>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Input type="submit" className="login-btn" value="Login" />
                    </FormGroup>
                </Form>
            </div>
            <div className="sign-up">Don't have an account ? <Link to="/account/register">Signup now!</Link></div>
        </div>
    </div>
  )
}

export default Login

