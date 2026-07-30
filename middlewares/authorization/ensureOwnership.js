const ensureOwnership = (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Forbidden!!!");
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default ensureOwnership;
