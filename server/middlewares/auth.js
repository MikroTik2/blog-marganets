const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler.js");
const User = require("../models/db/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");

const authMiddleware = asyncHandler(async (req, res, next) => {

     const { token } = req.cookies;
     if (!token) return next(new ErrorHandler("Please login to access", 401));

     const decoded = jwt.verify(token, "1234567890");
     req.user = await User.findById(decoded.id);
     next();

});

const authRoles = ( ...roles ) => {
     return (req, res, next) => {

          if (!roles.includes(req.user.role)) {
               return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 403));
          };

          next();

     };
};

module.exports = { authMiddleware, authRoles };