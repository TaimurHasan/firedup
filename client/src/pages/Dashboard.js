import React from "react";
import EventList from "../Components/EventList";
import FriendList from "../Components/FriendList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Loading from "../Components/Loading";
import Auth from '../utils/auth';
import { Navigate } from "react-router-dom";
import classes from "../css/Dashboard.module.css"

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_ME);

    //  if not logged in, redirect to login page
    if(!Auth.loggedIn()) {
        return <Navigate replace to='/login' />
    };

    if(loading) {
        return(
            <Loading />
        )
    };

    const user = data?.me || {};

    console.log(user.events)

    return(
        <div className="container">
            <h2 className="my-3 mx-1">Welcome, {user.username}!</h2>
            <div className={`container d-flex ${classes.dashboardMain}`}>
                <div className="col-lg-7">
                    <EventList events = {user.events} username = {user.username} />
                </div>
                <div className="col-lg-5">
                    <FriendList friends = {user.friends} />
                </div>
            </div>
        </div>
    )
};

export default Dashboard;