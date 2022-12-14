import React from "react";
import createEvent from "../../assets/images/firedupcreateevent.png";
import addFriends from "../../assets/images/firedupaddfriends.png";
import classes from "./BenefitsList.module.css";

const BenefitsList = () => {

    const benefits = [
        {   
            key: 1,
            name: "View Events & Add Friends",
            image: addFriends,
            alt: "create event page of firedup",
            description: "See what's coming up for you. Invite and find your friends on your dashboard to see what they're up to.",
            float: "left"
        },
        {
            key: 2,
            name: "Create Events",
            image: createEvent,
            alt: "create event page of firedup",
            description: "Add details for your event within the app. Choose the date, time, and which of your friends to invite.",
            float: "left"
        },
    ]

    return (
        <div className={`${classes.benefitsDiv}`}>    
            <div className="container py-4 px-0">
                {benefits.map(benefit => (
                    <div key={benefit.key} className={`d-flex my-4 py-4 ${classes.benefitCard}`}>
                            <div className={classes.image}>
                                <img src={benefit.image} alt={benefit.alt}/>
                            </div>
                            <div className={classes.benefitsDetails}>
                                <h3>{benefit.name}</h3>
                                <p>{benefit.description}</p>
                            </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
};

export default BenefitsList;