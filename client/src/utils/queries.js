import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
        _id
        username
        friends {
            _id
            username
        }
        events {
            _id
            eventTitle
            eventDate
            attendees {
            _id
            }
        }
        }
    }
`

export const QUERY_USER = gql`
    query User($username: String!) {
        user(username: $username) {
            _id
            username
        }
    }
`

export const QUERY_EVENTS = gql`
    query Events($username: String!) {
        events(username: $username) {
        _id
        eventDate
        eventTime
        eventTitle
        attendees {
            _id
        }
        }
    }
`

export const QUERY_EVENT = gql`
query Event($eventId: ID!) {
    event(eventId: $eventId) {
      eventTitle
      eventDate
      attendees {
        _id
        username
      }
    }
  }
`