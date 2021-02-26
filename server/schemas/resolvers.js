const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
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
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
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
      return user;
    },
  },
};
module.exports = resolvers;
