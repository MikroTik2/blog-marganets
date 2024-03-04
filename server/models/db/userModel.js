const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema({
     name:{
          type:String,
          required: [true, "please enter your name"],
     },
     email:{
          type:String,
          required:true,
          unique:true,
     }, 
     password: {
          type: String,
          required: [true, "please enter your password"],
          required: function () {
               return !this.googleId;
          },
     },

     avatar: {
          public_id: {
              type: String,
              default: ' '
          },
          url: {
              type: String,
              default: ' '
          },
      },
     role: {
          type: String,
          enum: ["user", "admin", "superadmin"],
          default: "user",
     },

     googleId: String,

     viewers: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
     }],

     comments: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
     }],

     blogs: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blogs",
     }],

     createdAt: {
          type: Date,
          default: Date.now(),
     },

     provider: {
          type: String,
          enum: ["local", "google"],
          default: "local",
     },

     resetPasswordToken: String,
     resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) {
          next();
     };

     this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
     return jwt.sign({ id: this._id }, "1234567890", { expiresIn: "2d" });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
     if (this.googleId) {
          return false;
     };

     return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = async function () {
     const resetToken = crypto.randomBytes(20).toString("hex");

     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

     return resetToken;

};

userSchema.statics.findOrCreateGoogleUser = async function (googleId, email, name, avatar) {
     let user = await this.findOne({ googleId });
   
     if (!user) {
          user = await this.create({
               googleId,
               email,
               name,
               avatar: avatar,
               provider: "google",
          });
     };
   
     return user;
};


//Export the model
module.exports = mongoose.model('User', userSchema);