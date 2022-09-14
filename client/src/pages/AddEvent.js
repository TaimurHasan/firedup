import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const AddEvent = () => {
    const [formState, setFormState] = useState({ eventTitle: '', eventDate: '', eventTime: ''});
    const [attendees, setAttendees] = useState([]);

    const { data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { eventTitle, eventTime, eventDate} = formState;
        
        const eventDateToAdd = `${eventDate}T${eventTime}`
        console.log(eventDateToAdd)
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
                <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
};

export default AddEvent;