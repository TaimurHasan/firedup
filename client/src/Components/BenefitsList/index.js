import React from "react";
import createEvent from "../../assets/images/firedupcreateevent.png";
import classes from "./BenefitsList.module.css";

const BenefitsList = () => {

    const benefits = [
        {
            name: "Add Friends",
            image: createEvent,
            alt: "create event page of firedup",
            description: "Invite and find your friends on your dashboard to see what they're up to.",
            float: "left"
        },
        {
            name: "Create Events",
            image: createEvent,
            alt: "create event page of firedup",
            description: "Add details for your event within the app and choose which of your friends to invite.",
            float: "right"
        },
    ]

    return (
        <div className={`${classes.benefitsDiv}`}>    
            <div className="container d-flex flex-column align-items-start flex-wrap py-4 px-0">
                {benefits.map(benefit => (
                    benefit.float === "left" ? (
                            <div className="d-flex my-4 py-4">
                                <div className={classes.image}>
                                    <img src={benefit.image} alt={benefit.alt}/>
                                </div>
                                <div className={classes.benefitsDetails}>
                                    <h3>{benefit.name}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="d-flex my-4 py-4">
                                <div className={classes.benefitsDetails}>
                                    <h3>{benefit.name}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                                <div className={classes.image}>
                                    <img src={benefit.image} alt={benefit.alt}/>
                                </div>
                            </div>
                        )
                ))}
                
            </div>
        </div>
    )
};

export default BenefitsList;