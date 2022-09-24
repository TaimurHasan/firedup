import React, { useState } from "react";
import classes from './FriendList.module.css';
import { AiOutlineUsergroupAdd, AiOutlineClose } from 'react-icons/ai';
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const FriendList = ({ friends }) => {
    const [getUser] = useLazyQuery(QUERY_USER);
    const [ username, setUsername ] = useState('');
    const [ expanded, setExpanded ] = useState(false);
    const [ searchedFriend, setSearchedFriend ] = useState('');
    const [ noFriend, setNoFriend ] = useState(false);

    const expand = () => {
        setExpanded(true);
    };

    const close = () => {
        setExpanded(false);
        setSearchedFriend('');
        setNoFriend(false);
    };

    const handleFormChange = (event) => {
        const { value } = event.target;

        setUsername(value);
    }

    const handleUsernameSubmit = async (event) => {
        event.preventDefault();
        
        const { data } = await getUser({ variables: { username }})
        
        if(data.user) {
            setSearchedFriend(data.user);
            setNoFriend(false)
        } else {
            setSearchedFriend('');
            setNoFriend(true)
        };

        console.log(searchedFriend)
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
                <div className={`mb-4 ${classes.friendCard} ${classes.addFriendDiv}`}>
                    <form onSubmit={handleUsernameSubmit}>
                        <input
                            className='w-100'
                            placeholder="Search username..."
                            id="username"
                            name="username"
                            onChange={handleFormChange}
                        />
                    </form>
                    {searchedFriend && (
                            <div className={`mt-4 ${classes.friendAddCard}`}>
                                <div>
                                    <h4>{searchedFriend.username}</h4>
                                </div>
                            </div>
                    )
                    }
                    {noFriend && (
                        <div>No users found.</div>
                    )}
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