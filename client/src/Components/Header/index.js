import React from "react";
import MobileNavigation from "../NavBar/MobileNavigation";
import Navigation from '../NavBar/Navigation';
import companyLogo from '../../assets/images/FiredUpHeader.png';
import classes from '../NavBar/NavBar.module.css'

const Header = () => {
    return(
        <div className={`container ${classes.NavBar}`}>
            <a href="/">
                <div className={classes.logoImage} >
                    <img src={companyLogo} alt="company logo"/>
                    <h1 className="my-2">fired up</h1>
                </div>
            </a>
            {/* <div>
                <h1 className="my-2">fired up</h1>
            </div> */}
            <nav className="d-flex">
                <Navigation />
                <MobileNavigation />
            </nav>
        </div>
    )
};

export default Header;