const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')
                    .populate('events')
                
                return userData;
            }
            
            throw new AuthenticationError('Not logged in');
        },
        users: async() => {
            return User.find()
                .select('-__V -password')
                .populate('friends')
                .populate('events')
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__V -password')
                .populate('friends')
                .populate('events')
        },
        events: async(parent, { username }) => {
            return Event.find({ username })
        },
        event: async(parent, { eventId }) => {
            return Event.findOne({ _id: eventId })
                .populate('attendees')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const username = args.username;
            const email = args.email;

            const found = await User.findOne({ username })
            const found2 = await User.findOne({ email })

            if(found || found2 ) {
                throw new AuthenticationError('This email or username is already taken!');
            };

            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            };

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            };

            const token = signToken(user);
            return { token, user };
        },
        addEvent: async(parent, args, context) => {
            // ensure user not adding themselves in friend list for event PENDING!!

            // if logged in
            if(context.user) {
                const event = await Event.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: event._id } },
                    { new: true }
                );

                // for loop to add event to each attendees event list
                for (let i = 0; i < args.attendees.length; i++) {
                    await User.findByIdAndUpdate(
                        { _id: args.attendees[i] },
                        { $push: { events: event._id } },
                        { new: true }
                    )
                };

                return event;
            };

            throw new AuthenticationError('You need to be logged in!')
        },
        deleteEvent: async (parent, { eventId }, context) => {
            if(context.user) {
                const event = await Event.findOne({ _id: eventId });
                
                if(event && event.username === context.user.username) {
                    await Event.findByIdAndDelete({ _id: eventId });

                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $pull: { events: eventId } },
                        { new: true }
                    );
                    
                    // for loop to remove event to from attendees event list
                    for (let i = 0; i < event.attendees.length; i++) {
                        await User.findByIdAndUpdate(
                            { _id: event.attendees[i] },
                            { $pull: { events: event._id } },
                            { new: true }
                        )
                    };

                    return event;
                } else {
                    throw new AuthenticationError('No event found!');
                }
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async(parent, { friendId }, context) => {
            if(context.user) {
                if(context.user._id !== friendId) {
                    const updatedFriend = await User.findOneAndUpdate(
                        { _id: friendId },
                        { $addToSet: { friends: context.user._id } },
                        {new: true}
                    ).populate('friends');

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { friends: friendId } },
                        { new: true }
                    ).populate('friends');

                    return updatedUser;
                } else {
                    throw new AuthenticationError('Cannot add yourself as a friend!');
                };
            };

            throw new AuthenticationError('You need to be logged in!')
        }
    }
};

module.exports = resolvers;
