import React, { useState } from 'react'

import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { signup, login } from '../../actions/auth';
import classes from './Auth.module.css';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(login(formData, navigate));
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name] : event.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignup(prevIsSignup => !prevIsSignup);
    };

    return (
        <div className={classes['form-card']}>
            <Form className='rounded p-4 p-sm-3' onSubmit={handleSubmit}>
                <div id={classes['form-title-card']}>
                    <Form.Text id={classes['form-title']}>{isSignup ? "Sign Up" : "Log In"}</Form.Text>
                </div>
                {isSignup && (
                    <>
                        <Form.Group className="mb-3" controlId='formBasicText'>
                            <Form.Control type="text" placeholder='First Name' name="firstName" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='formBasicText'>
                            <Form.Control type="text" placeholder='Last Name' name="lastName" onChange={handleChange} />
                        </Form.Group>
                    </>
                )}
                <Form.Group className="mb-3" controlId='formBasicText'>
                    <Form.Control type="text" placeholder='Email' name="email" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='formBasicText'>
                    <InputGroup>
                        <Form.Control type={showPassword ? "text" : "password"} placeholder='Password' name="password" onChange={handleChange} />
                        <InputGroup.Text className={classes['show-password']} onClick={handleShowPassword}>{showPassword ? <BiHide size={20} /> : <BiShow size={20} />}</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                {isSignup && 
                    <Form.Group className="mb-3" controlId='formBasicText'>
                        <Form.Control type={showPassword ? "text" : "password"} placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} />
                    </Form.Group>
                }
                <Form.Group className="d-grid gap-2 mx-auto" style={{ marginTop: "10px"}}>
                    <Button variant="primary" type="submit" id={classes['log-in']}>{isSignup ? "Sign Up" : "Log In"}</Button>
                </Form.Group>
                <div className={classes.switch}>
                    <Button id={classes['switch-mode']} onClick={switchMode}>
                        {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Auth