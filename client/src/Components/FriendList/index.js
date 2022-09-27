import React, { useState } from "react";
import classes from './FriendList.module.css';
import { AiOutlineUsergroupAdd, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";

const FriendList = ({ friends }) => {
    const [getUser] = useLazyQuery(QUERY_USER);
    const [addFriend] = useMutation(ADD_FRIEND);
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
    };

    const handleAddFriend = async () => {
        await addFriend({
            variables: {
                friendId: searchedFriend._id
            }
        });

        window.location.replace('/dashboard');
    }

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
                    <form autoComplete="off" onSubmit={handleUsernameSubmit}>
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
                                <AiOutlinePlus onClick={handleAddFriend} className = {`${classes.addFriendBtn}`} size = "20px"/>
                            </div>
                    )
                    }
                    {noFriend && (
                        <div className="mt-4">No users found.</div>
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
                <div className="mx-2 container">You have no friends yet. Add some friends!</div>
            )}
        </div>
    )
};

export default FriendList;