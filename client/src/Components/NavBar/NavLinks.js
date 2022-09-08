import React from "react"
import {motion} from 'framer-motion'
import classes from './NavBar.module.css'
import Auth from '../../utils/auth'

function NavLinks (props) {
    const animateFrom = {opacity: 0, y: -40, padding: 13}
    const animateTo = {opacity: 1, y: 0, padding: 13}

    if (!Auth.loggedIn()) {
        return (
            <ul className={classes.NavList}>
                <motion.li 
                    onClick={() => props.isMobile && props.closeMobileMenu()}
                    initial={animateFrom}
                    animate={animateTo}
                    transition={{delay: 0.10}}
                >
                    <a href="./">Home</a>
                </motion.li>
                <motion.li 
                    onClick={() => props.isMobile && props.closeMobileMenu()}
                    initial={animateFrom}
                    animate={animateTo}
                    transition={{delay: 0.20}}
                >
                    <a href="./login">Login</a>
                </motion.li>
            </ul>
        )
    }

    return (
            <ul className={classes.NavList}>
                <motion.li 
                    onClick={() => props.isMobile && props.closeMobileMenu()}
                    initial={animateFrom}
                    animate={animateTo}
                    transition={{delay: 0.10}}
                >
                    <a href="./dashboard"> Dashboard</a>
                </motion.li>
                <motion.li 
                    onClick={() => props.isMobile && props.closeMobileMenu()}
                    initial={animateFrom}
                    animate={animateTo}
                    transition={{delay: 0.20}}
                >
                    <a href="./" onClick={() => Auth.logout()}>Logout</a>
                </motion.li>
            </ul>
    )
}

export default NavLinks;