import React from "react";
import { AiFillLinkedin, AiFillGithub, AiFillTwitterSquare } from "react-icons/ai";
import classes from './Footer.module.css';

const Footer = () => {
    return(
        <div className={classes.footer}>
            <p>An application by TH</p>
            <div className = {classes.footerLinks}> 
                <a href="https://www.linkedin.com/in/taimur-h/" title="LinkedIn" target="_blank" rel="noreferrer">
                    <AiFillLinkedin className = {classes.Link} />
                </a>
                <a href="https://github.com/TaimurHasan" title="GitHub" target="_blank" rel="noreferrer">
                    <AiFillGithub className = {classes.Link}  />
                </a>
                <a href="https://twitter.com/taimur_coding" title="Twitter" target="_blank" rel="noreferrer">
                    <AiFillTwitterSquare className = {classes.Link}  />
                </a>
            </div>
        </div>
    )
};

export default Footer;