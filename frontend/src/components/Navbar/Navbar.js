import React, { useState, useEffect, useCallback } from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';
import { MdOutlineLogin } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';

import decode from 'jwt-decode';
import classes from './Navbar.module.css';
import logo from '../../images/tLogo.png';

const NavbarC = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT"})

        setUser(null);

        navigate("/auth");
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token])

    return (
        <div className={classes['navbar-card']}>
            <Navbar id={classes.navbar} variant="light">
                <Navbar.Brand as={Link} to="/" className={classes.brand}>
                    <div>
                        <span className={classes['navbar-title']}>
                            {user ? `${user.result.name}'s TravelBlog` : 'myTravelBlog'}
                        </span>
                    </div>
                    <img className={classes['navbar-logo']} src={logo} alt="logo" />
                </Navbar.Brand>
                {user ? (
                    <Button id={classes.log} variant="danger" onClick={logout}>
                        <MdOutlineLogin size={23} />
                    </Button>
                ) : (
                    <Button as={Link} to="/auth" id={classes.log} variant="danger">
                        <AiOutlineUser size={23} />
                    </Button>
                )}
            </Navbar>     
        </div>
    )
}

export default NavbarC