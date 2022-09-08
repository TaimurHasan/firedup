import React from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import classes from './NavBar.module.css';

function NavBar (props) {

    return (
        <div className={classes.NavBar}>
            <a href="./"> 
                <h1>Taimur Hasan</h1>
            </a>
            <Navigation />
            <MobileNavigation />
        </div>
    )
};

export default NavBar;