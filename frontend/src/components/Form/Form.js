import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import { Form, Button, Modal } from 'react-bootstrap';
import FileBase from 'react-file-base64';

import classes from './Form.module.css';

const FormC = ({ currentId, setCurrentId, onHideForm, show }) => {
    const [postData, setPostData] = useState({ title: "", description: "", tags: "", selectedFile: "" });
    const dispatch = useDispatch();
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post){
            setPostData(post);  
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
        onHideForm();

    };

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: "", description: "", tags: "", selectedFile: "" });
    };

    return (
        <Modal show={show} onHide={onHideForm}>
            <Modal.Header closeButton ></Modal.Header>
            <Modal.Body id={classes['modal-body']}>
                <div className={classes['form-card']}> 
                    <Form className='rounded p-4 p-sm-3' onSubmit={handleSubmit}>
                        <div className={classes['form-title-card']}>
                            <Form.Text id={classes['form-title']}>{currentId ? 'Editing' : "Creating"} a Post</Form.Text>
                        </div>
                        <Form.Group className="mb-3" controlId='formBasicText'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder='Enter title' name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='formBasicText'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder='Enter description' name="description" value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='formBasicText'>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder='Enter tags' name="tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                        </Form.Group>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                        <Form.Group className="d-grid gap-2 mx-auto" style={{ marginTop: "10px"}}>
                            <Button variant="success" type="submit" id={classes['form-submit']}> Submit </Button>
                            <Button variant="danger" id={classes['form-clear']} onClick={clear}> Clear </Button>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default FormC;