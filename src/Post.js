import React, { useState } from 'react'
import { Avatar } from '@material-ui/core';
import './Post.css';
import firebase from 'firebase';
import {db, storage} from './firebase';


function Post({userName, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar"
                alt="user__avatar"
                src="/static/images/avatar/1.jpg"/>
                <h3>{userName}</h3>
                <button className="del__button">
                    ...
                </button>
                </div>

            <img className="post__image" 
            src={imageUrl}
            alt=""
            />
             <h4 className="user__name"><strong>{userName} </strong>  {caption} </h4>
             <input className = "user__comment" placeholder="Enter a comment here"/>

             
        </div>
    )
}

export default Post
