import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Navigate } from "react-router-dom";

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    //  if logged in, redirect to dashboard
    if(Auth.loggedIn()) {
        return <Navigate replace to='/dashboard' />
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
        
            Auth.login(data.addUser.token);
        } catch (e) {
        console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    return (
        <div className="container">
        <Link to="/login">← Go to Login</Link>

        <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="my-2">
                <label htmlFor="username">Username:</label>
                <input
                    className='w-100'
                    placeholder="username"
                    name="username"
                    type="text"
                    id="username"
                    onChange={handleChange}
                />
                </div>
                <div className="my-2">
                <label htmlFor="email">Email Address:</label>
                <input
                    className='w-100'
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                />
                </div>
                <div className="my-2">
                <label htmlFor="pwd">Password:</label>
                <input
                    className='w-100'
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                />
                </div>
                {error ? (
                <div>
                    <p className="error-text">There was an issue creating your account, please try again!</p>
                </div>
                ) : null}
                <div className="flex-row flex-end">
                <button type="submit">Get Fired Up</button>
                </div>
            </form>
        </div>
  );
}

export default Signup;
