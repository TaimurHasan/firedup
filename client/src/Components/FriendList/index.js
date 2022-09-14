import React from "react";
import classes from './FriendList.module.css';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const FriendList = ({ friends }) => {

    return (
        <div className="container my-4">
            <div className="container d-flex justify-content-between">
                <h3 className="mx-1">Your Friends:</h3>
                <AiOutlineUsergroupAdd className = {classes.addFriendBtn} size = "35px"/>
            </div>
            {friends.length ? (
                <div className="mx-1">
                    {friends.map(friend => (
                        <a className={classes.friendLink} href='/' key={friend._id}>
                            <div className={`${classes.friendCard}`}>
                                <div>
                                    <h4>{friend.username}</h4>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="mx-2">You have no friends yet. Add some friends!</div>
            )}
        </div>
    )
};

export default FriendList;