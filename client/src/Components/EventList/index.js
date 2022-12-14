import React from "react";
import classes from './Event.module.css';
import { useMutation } from '@apollo/client';
import { DELETE_EVENT } from "../../utils/mutations";
import { dateFormat } from "../../utils/dateFormat";
import { AiOutlinePlusCircle, AiFillDelete } from 'react-icons/ai'

const EventList = ({ events, username }) => {
    const [deleteEvent] = useMutation(DELETE_EVENT);

    const handleEventDelete = async (event, eventId) => {
        event.preventDefault();
        const confirmDelete = window.confirm('Are you sure you want to delete this event?')

        if(confirmDelete) {
            await deleteEvent({
                variables: { eventId }
            })

            window.location.replace("/dashboard");
        } else {
            window.location.replace("/dashboard");
        };
    }

    return (
        <div className="container my-4">
            <div className="container d-flex justify-content-between">
                <h3 className="mx-1">Your Upcoming Events:</h3>
                <a className={classes.eventLink} href="/addevent">
                    <AiOutlinePlusCircle className = {classes.addEventBtn} size = "35px"/>
                </a>
            </div>
            {events.length ? (
                <div className="mx-1">
                    {events.map(thisEvent => (
                        <a className={classes.eventLink} href={`/event/${thisEvent._id}`} key={thisEvent._id}>
                            <div className={`mb-2 ${classes.eventCard}`}>
                                <div className="container d-flex px-0">
                                    <div className="col-11">
                                        <h4>{thisEvent.eventTitle}</h4>
                                        <p>{dateFormat(thisEvent.eventDate)}</p>
                                        <p>Created by {thisEvent.username === username ? `you` : thisEvent.username}</p>
                                    </div>
                                    {thisEvent.username === username &&
                                        <div className="col-1 d-flex justify-content-end align-items-center">
                                                <AiFillDelete onClick={event => handleEventDelete(event, thisEvent._id) } className={classes.deleteEventBtn} size="25px" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="mx-2 container">No events to show!</div>
            )}
        </div>
    )
};

export default EventList;