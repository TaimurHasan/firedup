import React from "react";
import EventList from "../Components/EventList";
import FriendList from "../Components/FriendList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    if(loading) {
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div className="container">
            <h2 className="my-4">{user.username}</h2>
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