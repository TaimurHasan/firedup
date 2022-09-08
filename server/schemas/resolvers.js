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
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const username = args.username;
            const found = await User.findOne({ username })

            if(found) {
                throw new AuthenticationError('This username is already taken!');
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

                return event;
            };

            throw new AuthenticationError('You need to be logged in!')
        }
    }
};

module.exports = resolvers;
