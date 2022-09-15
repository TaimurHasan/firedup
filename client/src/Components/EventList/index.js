import React from "react";
import classes from './Event.module.css';
import { useMutation } from '@apollo/client';
import { DELETE_EVENT } from "../../utils/mutations";
import { AiOutlinePlusCircle, AiOutlineCloseSquare } from 'react-icons/ai'

const EventList = ({ events }) => {
    const [deleteEvent, { error }] = useMutation(DELETE_EVENT);

    const handleEventDelete = async (event) => {
        event.preventDefault();

        const confirmDelete = window.confirm('Are you sure you want to delete this event?')

        if(confirmDelete) {
            const eventId = event.target.getAttribute("data-event-id");
            await deleteEvent({
                variables: { eventId }
            })

            window.location.reload(false);
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
                    {events.map(event => (
                        <a className={classes.eventLink} href='/' key={event._id}>
                            <div className={`mb-2 ${classes.eventCard}`}>
                                <div className="container d-flex px-0">
                                    <div className="col-11">
                                        <h4>{event.eventTitle}</h4>
                                        <p>{event.eventDate}</p>
                                    </div>
                                    <div className="col-1 d-flex justify-content-end">
                                            <AiOutlineCloseSquare data-event-id={event._id} className={classes.deleteEventBtn} size="20px" onClick={handleEventDelete}/>
                                    </div>
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