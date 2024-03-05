const sendToken = (user, statusCode, res) => {
     const token = user.getJWTToken();

     const options = {
          expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          sameSite: 'None',  // Add this line
          secure: true, 
     };

     res.status(statusCode).cookie('token', token, options).json({
          success: true,
          user,
          token,
     });
};

module.exports = sendToken;