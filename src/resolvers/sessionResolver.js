export default {
  Query: {
    async getAllSession (parents, args, { Session }) {
      const sessions = await Session.find();
      return sessions;
    },
    async currentSession (parents, { id }, { Session }) {
      const sessions = await Session.findById(id);
      return sessions;
    }
  },
  Mutation: {
    async createSession (parents, args, { Session }) {
      const newSession = await new Session(args).save();
      return newSession;
    },
    async joinSession (parents, { id, name }, { Session }) {
      const session = await Session.findByIdAndUpdate(
        id,
        {
          $addToSet: { participants: name }
        },
        {
          new: true,
          upsert: true,
          runValidators: true
        });
      return session;
    },
    async leaveSession (parents, { id, name }, { Session }) {
      const session = await Session.findByIdAndUpdate(
        id,
        {
          $pull: { participants: name }
        },
        {
          new: true,
          upsert: true
        });
      if (session.participants.length === 0) {
        await session.remove();
        const removedSession = {
          _id: '0000',
          name: '000',
          participants: ['000']
        };
        return removedSession;
      } else {
        return session;
      }
    },
    async removeSession (parent, { id }, { Session }) {
      const session = await Session.findById(id).remove();
      if (session) {
        return 'Session successfully removed';
      }
      return 'Session didn\'t successfully';
    }
  }
};
