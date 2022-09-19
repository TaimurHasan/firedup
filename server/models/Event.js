const { Schema, model } = require('mongoose');
const moment = require('moment');

const eventSchema = new Schema(
    {
        eventTitle: {
            type: String,
            required: 'Your event needs a title!',
            minlength: 1,
            maxlength: 280
        },
        eventDate: {
            type: Date,
            required: 'Your event needs a set time!',
            get: timestamp => moment(timestamp).format("MMM Do YYYY, h:mm a")
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format("MMM Do YYYY, h:mm a")
        },
        username: {
            type: String,
            required: true
        },
        attendees: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;