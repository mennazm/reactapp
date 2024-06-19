exports.isAdmin = (req, res, next) => {
  // check if user is admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

exports.isUser = (req, res, next) => {
  // check if user is admin
  if (req.user.role !== "user") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

exports.isSelfParams = (req, res, next) => {
  // check if user is admin
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({
      message: "Access denied, you are not the owner of this resource",
    });
  }
  next();
};

exports.isSelfBody = (req, res, next) => {
  // check if user is admin
  if (req.user.userId !== req.body.userId) {
    return res.status(403).json({
      message: "Access denied, you are not the owner of this resource",
    });
  }
  next();
};
