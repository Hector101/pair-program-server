export default {
  Query: {
    async getAllSession (parents, args, { Session }) {
      const sessions = await Session.find();
      return sessions;
    },
    async currentSession (parents, { _id }, { Session }) {
      const sessions = await Session.findById(_id);
      return sessions;
    }
  },
  Mutation: {
    // createSession
    async createSession (parents, args, { Session }) {
      const newSession = await new Session(args).save();
      const { _id } = newSession;
      const session = Session.findById(_id)
        .populate('participants');
      return session;
    },
    // joinSession
    async joinSession (parents, { _id, userId }, { Session }) {
      const session = await Session.findByIdAndUpdate(
        _id,
        {
          $addToSet: { participants: userId }
        },
        {
          new: true,
          runValidators: true
        }).populate('participants');
      if (!session) {
        return {
          error: 'Session not found'
        };
      }
      return { session };
    },
    // leaveSession
    async leaveSession (parents, { _id, userId }, { Session }) {
      const session = await Session.findByIdAndUpdate(
        _id,
        {
          $pull: { participants: userId }
        },
        {
          new: true
        }).populate('participants');
      if (!session) {
        return {
          error: 'Session not found'
        };
      }
      return { session };
    },
    // removeSession
    async removeSession (parent, { _id, userId }, { Session, User }) {
      const session = await Session.findByOne({ _id, sessioncreator: userId });
      if (!session) {
        return 'Not authorized to remove session';
      }
      session.remove();
      return 'Session not available';
    }
  }
};
