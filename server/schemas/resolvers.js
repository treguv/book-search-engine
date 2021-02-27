const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");
//add authentication later

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password").populate("savedBooks");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("savedBooks");
    },
    books: async () => {
      return Book.find().select("-__v");
    },
    book: async (parent, { title }) => {
      return Book.findOne({ title }).select("-__v");
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
      //check if the user was found
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      //check password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      //if we made it here we got the right credentials
      const token = signToken(user);
      return { token, user };
    },
  },
};
module.exports = resolvers;
