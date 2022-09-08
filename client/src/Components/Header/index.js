import React from "react";
import MobileNavigation from "../NavBar/MobileNavigation";
import Navigation from '../NavBar/Navigation';
import classes from '../NavBar/NavBar.module.css'

const Header = () => {
    return(
        <div className={classes.NavBar}>
            <div>
                <h1 className="my-2">fired up</h1>
            </div>
            <nav className="d-flex">
                <Navigation />
                <MobileNavigation />
            </nav>
        </div>
    )
};

export default Header;