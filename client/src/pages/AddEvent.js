import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_EVENT } from "../utils/mutations";

const AddEvent = () => {
    const [formState, setFormState] = useState({ eventTitle: '', eventDate: '', eventTime: ''});
    const [attendees, setAttendees] = useState([]);

    const { data } = useQuery(QUERY_ME);
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    const user = data?.me || {};

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { eventTitle, eventTime, eventDate} = formState;
        
        const eventDateToAdd = `${eventDate}T${eventTime}`;

        try {
            const { data } = await addEvent({
                variables: {
                    eventTitle,
                    eventDate: eventDateToAdd,
                    attendees
                }
            })
        } catch (e) {
            console.log(e);
        }
        
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return(
        <div className="container">
            <h2>Your Event Details:</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="my-2">
                <label htmlFor="eventTitle">Enter Title:</label>
                <input
                    className='w-100'
                    placeholder="party up!"
                    name="eventTitle"
                    type="text"
                    id="eventTitle"
                    onChange={handleChange}
                />
                </div>
                <div className="my-2">
                <label htmlFor="eventDate">Event Date:</label>
                <input
                    className='w-100'
                    name="eventDate"
                    type="date"
                    id="eventDate"
                    onChange={handleChange}
                />
                </div>
                <div className="my-2">
                <label htmlFor="eventTime">Event Time:</label>
                <input
                    className='w-100'
                    name="eventTime"
                    type="time"
                    id="eventTime"
                    onChange={handleChange}
                />
                </div>
                {/* {error ? (
                <div>
                    <p className="error-text">The provided credentials are incorrect</p>
                </div>
                ) : null} */}
                <div className="flex-row flex-end">
                <button type="submit">Fire Up</button>
                </div>
            </form>
        </div>
    )
};

export default AddEvent;