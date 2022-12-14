import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Navigate } from "react-router-dom";

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    //  if logged in, redirect to dashboard
    if(Auth.loggedIn()) {
        return <Navigate replace to='/dashboard' />
    };
    

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState }
            });
        
            Auth.login(data.login.token);
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
        <Link to="/signup">← Go to Signup</Link>

        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
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
                <p className="error-text">The provided credentials are incorrect</p>
            </div>
            ) : null}
            <div className="flex-row flex-end">
            <button type="submit">Login</button>
            </div>
        </form>
        </div>
  );
}

export default Login;
