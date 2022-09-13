import React from "react";
import classes from './Event.module.css';

const EventList = ({ events }) => {

    return (
        <div className="container my-4">
            <h3 className="mx-1">Your Upcoming Events:</h3>
            {events ? (
                <div className="mx-1">
                    {events.map(event => (
                        <a className={classes.eventLink} href='/' key={event._id}>
                            <div className={`my-2 ${classes.eventCard}`}>
                                <div>
                                    <h4>{event.eventTitle}</h4>
                                    <p>{event.eventDate}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div>No events to show!</div>
            )}
        </div>
    )
};

export default EventList;