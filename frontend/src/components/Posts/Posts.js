import React from 'react'

import { useSelector } from 'react-redux'
import { CardGroup, Spinner } from 'react-bootstrap';
import Post from './Post/Post';

import classes from './Posts.module.css';

const Posts = ({ setCurrentId, onShowForm }) => {
    const posts = useSelector(state => state.posts);

    return (
        !posts.length ? (
            <div className={classes.spinners}>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
            </div>
        ) : (
            <div className={classes.posts}>
                {posts.map((post) => (
                    <CardGroup className={classes['card-group']} key={post._id}>
                        <Post 
                            post={post}
                            setCurrentId={setCurrentId}
                            showForm={onShowForm}
                        />
                    </CardGroup>
                ))}
            </div>
        )
        
    )
}

export default Posts