const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Event {
        _id: ID
        eventTitle: String
        eventDate: String
        eventTime: String
        attendees: [User]
        username: String
        createdAt: String
    }
    type User {
        _id: ID
        username: String
        email: String
        events: [Event]
        friends: [User]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        events(username: String!): [Event]
        event(eventId: ID!): Event
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addEvent(eventTitle: String!, eventDate: String!, attendees: [ID]): Event
        deleteEvent(eventId: ID!): Event
        addFriend(friendId: ID!): User
    }
`;

module.exports = typeDefs;