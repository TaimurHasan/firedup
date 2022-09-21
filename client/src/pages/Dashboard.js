import React from "react";
import EventList from "../Components/EventList";
import FriendList from "../Components/FriendList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Loading from "../Components/Loading";

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_ME);

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
            <div className="container d-flex">
                <div className="col-lg-7">
                    <EventList events = {user.events} />
                </div>
                <div className="col-lg-5">
                    <FriendList friends = {user.friends} />
                </div>
            </div>
        </div>
    )
};

export default Dashboard;