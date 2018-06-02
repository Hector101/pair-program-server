import bcrypt from 'bcrypt';

import { generateToken } from '../helpers/generateToken';
import { filterUser } from '../helpers/filter';

export default {
  // Query
  Query: {
    async getUser (parent, { _id }, { User }) {
      const user = await User.findById(_id);
      if (user.inactive === true) {
        return {
          error: { message: 'Account deactivated' }
        };
      }
      return {user};
    },
    async getAllUsers (parent, args, { User }) {
      const users = await User.find({ inactive: false });
      return users;
    }
  },
  // Mutations
  Mutation: {
    async createUser (parent, args, { User }) {
      const newUser = await new User(args).save();
      return {
        user: newUser,
        token: generateToken(filterUser(newUser))
      };
    },
    async updateUser (parent, { _id, ...body }, { User }) {
      const updatedUser = await User.findByIdAndUpdate(_id, body, {new: true});
      return {
        user: updatedUser,
        token: generateToken(filterUser(updatedUser))
      };
    },
    async updatePassword (parent, { _id, password }, { User }) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const updatedUser = await User.findByIdAndUpdate(_id, {password: hashedPassword}, {new: true});
      return {
        user: updatedUser
      };
    },
    async signinUser (parent, { email, password }, { User }) {
      const signinUser = await User.findOne({ email, inactive: false });
      if (!signinUser) {
        return {
          error: { message: 'Login not successful' }
        };
      }
      const isMatch = bcrypt.compareSync(password, signinUser.password);
      if (!isMatch) {
        return {
          error: { message: 'Login not successful' }
        };
      }
      return {
        user: signinUser,
        token: generateToken(filterUser(signinUser))
      };
    },
    async deactivateUser (parent, { _id }, { User }) {
      const deactivatedUser = await User.findByIdAndUpdate(_id, { inactive: true });
      return deactivatedUser;
    },
    async activateUser (parent, { _id }, { User }) {
      const activatedUser = await User.findByIdAndUpdate(_id, { inactive: false });
      return activatedUser;
    }
  }
};
