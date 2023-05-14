const handleNotFound = (req, res, next) => {
  const error = new Error("Not Found!");
  error.statusCode = 404;
  next(error);
};

const handleErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
  });
};

module.exports = {
  handleNotFound,
  handleErrors,
};
