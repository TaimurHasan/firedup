const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
                .select('-__V -password')
                .populate('friends')
                .populate('events')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
    }
};

module.exports = resolvers;
