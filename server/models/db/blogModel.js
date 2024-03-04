const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let blogSchema = new mongoose.Schema({
     title: {
          type: [String],
          required: [true, "title is required"],
          trim: true,
     },

     description: {
          type: [String],
          required: [true, "post description is required"],
          trim: true,
     },

     numViews:{
          type:Number,
          default: 0,
     },

     images: [{
          public_id: String,
          url: String
     }],

     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Author is required"],
     },

     comments: [{
          type: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
     }],

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);