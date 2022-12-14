import React from "react";
import Hero from "../Components/Hero";
import BenefitsList from "../Components/BenefitsList";
import Auth from '../utils/auth';
import { Navigate } from "react-router-dom";
import classes from "../css/Home.module.css";

const Home = () => {
    //  if logged in, redirect to dashboard
    if(Auth.loggedIn()) {
        return <Navigate replace to='/dashboard' />
    };

    return(
        <div>
            <Hero />
            <div className={`container ${classes.homeIntro}`}>
                <h2>The best way to plan your fun.</h2>
                <p className="mt-4">🔥<span>fired up</span> is an event scheduling platform for you and your friends. Simply create an account, add your friends, and start planning some fun times. 
                Let your friends know how you're feeling - whether you're frozen up, warming up, or <span>fired up</span> to party!</p>
            </div>
            <BenefitsList />
        </div>
    )
};

export default Home;