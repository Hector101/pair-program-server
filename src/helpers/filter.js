export const filterUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  imageUrl: user.imageUrl
});
