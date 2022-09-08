import React from "react";
import NavLinks from "./NavLinks";
import classes from './NavBar.module.css';

function Navigation (props) {

    return (
        <nav className={classes.Navigation}>
            <NavLinks />
        </nav>
    );
};

export default Navigation;