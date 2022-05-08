import React from 'react'

import { Card, Button, ButtonToolbar } from 'react-bootstrap';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from 'react-icons/ai';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import classes from './Post.module.css';

const Post = ({ post, setCurrentId, showForm }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const editPost = () => {
        setCurrentId(post._id);
        showForm();
    };

    const deleteSelectedPost = () => {
        dispatch(deletePost(post._id));
    };

    const likeSelectedPost = () => {
        dispatch(likePost(post._id));
    };

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === user?.result?._id)
            ? (
              <><AiFillLike size={20} />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><AiOutlineLike size={20} />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><AiOutlineLike size={20} />&nbsp;Like</>;
      };

    return (
        <Card id={classes.card}>
            <Card.Img variant="top" src={post.selectedFile} height="300px" />
            <div className={classes['img-card']}>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>{moment(post.createdAt).fromNow()}</Card.Text>
                {user?.result?._id === post.creator && (
                    <div className={classes.edit}>
                        <Button onClick={editPost} id={classes['post-edit-button']}>
                            <HiDotsHorizontal size={20} />
                        </Button>
                    </div>
                )}
            </div>
            <Card.Header className={classes['card-tags']}>{post.tags.map((tag) => `#${tag} `)}</Card.Header>
            <Card.Body>
                <Card.Title className={classes['card-title']}>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <ButtonToolbar id={classes['card-options']}>
                    <Button id={classes['post-like-button']} onClick={likeSelectedPost} disabled={!user?.result}>
                        <Likes />
                    </Button>
                    {user?.result?._id === post?.creator && (
                        <Button id={classes['post-delete-button']} onClick={deleteSelectedPost}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    )}
                </ButtonToolbar>
            </Card.Body>
        </Card>
    )
}

export default Post