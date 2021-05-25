const { User, Review, Game } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('reviews')
                    .populate('follows');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        reviews: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Review.find(params).sort({ createdAt: -1 });
        },
        // place this inside of the `Query` nested object right after `reviews` 
        review: async (parent, { _id }) => {
            return Review.findOne({ _id });
        },
        reviewGame: async (parent, { gameTitle }) => {
            return Review.find({ gameTitle }).sort({ createdAt: -1 });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('follows')
                .populate('reviews');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('follows')
                .populate('reviews');
        },
        //get all games
        games: async () => {
            return Game.find()
        },
        game: async (parent, { name }) => {
            return Game.findOne({ name })
        },
        

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addReview: async (parent, args, context) => {
            if (context.user) {
                const review = await Review.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { reviews: review._id } },
                    { new: true }
                );

                return review;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFollow: async (parent, { followId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { follows: followId } },
                    { new: true }
                ).populate('follows');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeFollow: async (parent, { followId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { follows: followId } },
                    { new: true }
                ).populate('follows');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        editReview: async (parent, { _id, title, reviewBody, rating }, context) => {
            if (context.user) {
                const review = await Review.findByIdAndUpdate(
                    { _id: _id },
                    { $set: { title: title, reviewBody: reviewBody, rating: rating } },
                    { new: true }
                );
                return review;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteReview: async (parent, { _id }, context) => {
            if (context.user) {
                const review = await Review.findOneAndDelete(
                    { _id: _id }
                );
                return review;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addGame: async (parent, args) => {
            const game = await Game.create(args);
            return game;
        },
    }
}

module.exports = resolvers;