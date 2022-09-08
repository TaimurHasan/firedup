import React, { useState } from "react";
import NavLinks from "./NavLinks";
import classes from './NavBar.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

function MobileNavigation (props) {

    const [open, setOpen] = useState(false);

    const hamburgerIcon = 
    <AiOutlineMenu className = {classes.Hamburger} size='40px' color='black' 
        onClick={() => setOpen(!open)}
    />

    const closeIcon = 
    <GrClose className = {classes.Hamburger} size='40px' color='black' 
        onClick={() => setOpen(!open)}
    />

    const closeMobileMenu = () => {
        setOpen(false);
    }
    return (
        <nav className={classes.MobileNavigation}>
            {open ? closeIcon : hamburgerIcon}
            {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu}/>}
        </nav>
    )
}

export default MobileNavigation;