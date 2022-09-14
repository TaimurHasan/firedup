import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($eventTitle: String!, $eventDate: String!, $attendees: [ID]) {
    addEvent(eventTitle: $eventTitle, eventDate: $eventDate, attendees: $attendees) {
      _id
      eventDate
    }
  }
`