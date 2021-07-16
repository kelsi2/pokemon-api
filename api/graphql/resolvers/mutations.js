module.exports = {
  // Comments
  createComment: async (
    parent,
    { pokemonId, author, text, upvotes, downvotes },
    { models }
  ) => {
    // Extract out the fields that were passed in by the client from args
    const comment = { pokemonId, author, text, upvotes, downvotes };

    // save the comment to the db with those values
    const createdComment = await models.Comment.create(comment);

    // Update the pokemon model to add this new comment

    // send back the saved comment to the client

    return createdComment;
  },
  updateComment: async (
    parent,
    { commentId, pokemonId, author, text, upvotes, downvotes },
    { models }
  ) => {
    const commentUpdates = {};

    Object.entries({
      commentId,
      pokemonId,
      author,
      text,
      upvotes,
      downvotes,
    }).forEach(([key, value]) => {
      if (value) {
        commentUpdates[key] = value;
      }
    });

    const updatedComment = await models.Comment.findOneAndUpdate(
      { _id: commentId },
      commentUpdates,
      { new: true }
    ).exec();

    return updatedComment;
  },
  deleteComment: async (parent, { commentId }, { models }) => {
    return await models.Comment.findOneAndDelete({ _id: commentId }).exec();
  },
};
