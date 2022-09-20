import React from "react";
import Hero from "../Components/Hero";
import classes from "../css/Home.module.css"

const Home = () => {
    return(
        <div>
            <Hero />
            <div className={`container ${classes.homeIntro}`}>
                <h2>The best way to plan your fun.</h2>
                <p>🔥<span>fired up</span> is an event scheduling platform for you and your friends. Simply create an account, add your friends, and start planning some fun times. 
                Let your friends know how you're feeling, whether you're tied up, getting up, or <span>fired up</span> to party!</p>
            </div>
        </div>
    )
};

export default Home;