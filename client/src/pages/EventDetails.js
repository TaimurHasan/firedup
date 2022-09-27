import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import { dateFormat, calcDaysLeft } from "../utils/dateFormat";
import Auth from '../utils/auth';
import Loading from "../Components/Loading";
import classes from '../css/EventDetails.module.css'

const EventDetails = () => {
    const {id: eventId} = useParams();
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: {
            eventId
        }
    });

    if(loading) {
        return(
            <Loading />
        )
    };

    const { eventTitle, eventDate, attendees, username } = data?.event || {};

    let daysLeft = calcDaysLeft(eventDate)      
        
    

    return (
        <div className="container">
            <a href='/dashboard'>&larr; Back to Dashboard </a>
            <div className={`mt-4 ${classes.eventDetails}`}>
                <h2>{eventTitle}</h2>
                <p className="mt-4 mb-0">{dateFormat(eventDate)}</p>
                <p className="mt-0 mb-0">{`Created by ${Auth.getProfile().data.username === username ? "You" : username }`}</p>
                <p className={classes.daysLeft}>{daysLeft}</p>
            </div>
            <h3>Attendees:</h3>
            <div className="d-flex flex-column">
                {attendees && attendees.map(attendee => (
                    <a className={classes.friendLink} href='/' key={attendee._id} >
                        <div className={`${classes.friendCard}`}>
                            <div>
                                <h4>{attendee.username}</h4>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
};

export default EventDetails;