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