const { User, Book } = require('../models');
const { ObjectId } = require("mongoose").Types;
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {

       

        user: async (parent, { _id }) => {
            return User.findOne({ _id: ObjectId(_id) });
        },

       
    },
    Mutation: {
        
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);
            return {
                token: token,
                user: user
            };
        },
       
        saveBook: async (parent,{ authors, discription, bookId, image, link, title}, context)=>{
           
            const book = await Book.findoneAndUpdate({ _id: context.user._id },{$addToSet: { savedBooks: { _id, authors, discription, bookId, image, link, title}}},{ new: true, runValidators: true })
            return book;}
        ,
        removeBook: async (parent, bookId, context)=>{
           
            const book = await Book.findoneAndUpdate({ _id: context.user._id },{$pull: { savedBooks: {  bookId:bookId}}},{ new: true })
            return book;}
        ,
        login: async (parent, { username, email, password }) => {
            // make sure the user exists
            const user = await User.findOne({ $or: [email , username]});

            if (!user) {
                throw new AuthenticationError('No user with this email or username found!');
            }

            // check the password
            const correctPw = await user.comparePassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            // get the user token
            const token = signToken(user);
            return { token, user };
        }
    },
};

module.exports = resolvers;