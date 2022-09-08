import React from "react"
import {motion} from 'framer-motion'
import classes from './NavBar.module.css'

function NavLinks (props) {
    const animateFrom = {opacity: 0, y: -40, padding: 13}
    const animateTo = {opacity: 1, y: 0, padding: 13}

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
                    transition={{delay: 0.40}}
                >
                    <a href="./login">Login</a>
                </motion.li>
            </ul>
    )
}

export default NavLinks;