const { Timestamp } = require('bson');
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
            get: timestamp => dateFormat(timestamp) 
        },
        eventTime: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp) 
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
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;