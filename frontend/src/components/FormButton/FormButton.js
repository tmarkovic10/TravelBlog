import React from 'react'

import { Button } from 'react-bootstrap';
import { AiOutlinePlusSquare } from 'react-icons/ai';

import classes from './FormButton.module.css';

const FormButton = ({ onShowForm }) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?.name) {
        return(
            <div className={classes['not-logged']}>
                <p>Please Log In to create your own posts and interact with others.</p>
            </div>
        )
    }

    return (
        <div className={classes['show-form-card']}>
            <Button id={classes['show-form-button']} onClick={onShowForm}>
                <AiOutlinePlusSquare size={30} />
            </Button>
        </div>
    )
}

export default FormButton