const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Event {
        _id: ID
        eventTitle: String
        eventDate: String
        eventTime: String
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
        users: [User]
        user(username: String!): User
        events(username: String): [Event]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;