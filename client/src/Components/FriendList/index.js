import React from "react";
import classes from './FriendList.module.css';

const FriendList = ({ friends }) => {

    return (
        <div className="container my-4">
            <h3 className="mx-1">Your Friends:</h3>
            {friends.length ? (
                <div className="mx-1">
                    {friends.map(friend => (
                        <a href='/' key={friend._id}>
                            <div className={`my-2 ${classes.friendCard}`}>
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