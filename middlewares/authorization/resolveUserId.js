const resolveUserId = (req, res, next) => {
  try {
    req.userId = req.user.id;
    next();
  } catch (error) {
    next(error);
  }
};

export default resolveUserId;
