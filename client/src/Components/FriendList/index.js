import React, { useState, useRef } from "react";
import classes from './FriendList.module.css';
import { AiOutlineUsergroupAdd, AiOutlineClose } from 'react-icons/ai';

const FriendList = ({ friends }) => {
    const [ expanded, setExpanded ] = useState(false);
    const ref = useRef(null);

    const expand = () => {
        setExpanded(true);
        ref.focus();
    };

    const close = (event) => {
        setExpanded(false);
    };

    return (
        <div className="container my-4">
            <div className="container d-flex justify-content-between">
                <h3 className="mx-1">Your Friends:</h3>
                {expanded ? (
                        <AiOutlineClose onClick={close} className = {`${classes.addFriendBtn}`} size = "35px"/>
                    ) : (
                        <AiOutlineUsergroupAdd onClick={expand} className = {`${classes.addFriendBtn}`} size = "35px"/>
                    )
                }   
            </div>
            {expanded && 
                <div className={`mb-4 ${classes.addFriendDiv}`}>
                    <form>
                        <input
                            ref={ref}
                            className='w-100'
                            placeholder="Search username..."
                        />
                    </form>
                </div>
            }
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