import React, { useState, useEffect, Fragment } from 'react'

import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import FormButton from '../FormButton/FormButton';
import FormC from '../Form/Form';
import Posts from '../Posts/Posts';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [formIsShown, setFormIsShown] = useState(false);
    const dispatch = useDispatch();
  
    const showFormHandler = () => setFormIsShown(true);
    const hideFormHandler = () => setFormIsShown(false);
  
    useEffect(() => {
      dispatch(getPosts())
    }, [currentId, dispatch])

    
    return (
        <Fragment>
            <FormButton onShowForm={showFormHandler} />
            {formIsShown &&
                <FormC 
                currentId={currentId} 
                setCurrentId={setCurrentId} 
                show={formIsShown}
                onHideForm={hideFormHandler}/>
            }
            <Posts setCurrentId={setCurrentId} onShowForm={showFormHandler}/>
        </Fragment>
    )
}

export default Home