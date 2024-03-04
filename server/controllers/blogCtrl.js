const User = require("../models/db/userModel.js");
const Blog = require("../models/db/blogModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const slugify = require("slugify");

const createBlog = asyncHandler(async (req, res, next) => {

     if (!req.body.title[0] || !req.body.title[1]) {
          return res.status(400).json({
              success: false,
              message: "Заголовок не може бути порожнім",
          });
      }
      
      if (!req.body.description[0] || !req.body.description[1] || !req.body.description[2]) {
          return res.status(400).json({
              success: false,
              message: "Опис не може бути порожнім",
          });
      }

     let images = [];

     if (!req.body.images[0] || !req.body.images[1]) {
          return res.status(400).json({
              success: false,
              message: "Необхідно додати щонайменше два зображення",
          });
      }
      
     if (typeof req.body.images === "string") {
          images.push(req.body.images);
     } else {
          images = req.body.images;
     };

     const imagesLink = [];

     for (let i = 0; i < images.length; i++) {

          const result = await cloudinary.v2.uploader.upload(images[i], {
               folder: "blogs",
          });
          
          imagesLink.push({
               public_id: result.public_id,
               url: result.secure_url,
          });
     };

     req.body.images = imagesLink;
     req.body.author = req.user.id;

     const blog = await Blog.create(req.body);

     await User.findByIdAndUpdate(req.user.id, {
          $addToSet: { blogs: blog._id },
     }, { new: true });

     res.status(201).json({
          success: true,
          blog,
     });
});

const getAllBlogs = asyncHandler(async (req, res, next) => {
     const blogs = await Blog.find();
     if (!blogs) return next(new ErrorHandler("Blogs not found", 404));

     res.status(200).json(blogs);
});

const getBlog = asyncHandler(async (req, res, next) => {
     const id = req.params.id;

     const blog = await Blog.findById(id).populate("author");
     if (!blog) return next(new ErrorHandler("Blog not found", 404));

     res.status(200).json({
          success: true,
          blog,
     });
});

const updateBlog = asyncHandler(async (req, res, next) => {
     let blog = await Blog.findById(req.params.id);

     if (!blog) return next(new ErrorHandler("Blog not found", 404));

     if (req.body.images !== undefined) {
          let images = [];

          if (typeof req.body.images === "string") {
               images.push(req.body.images);
          } else {
               images = req.body.images;
          };

          for (let i = 0; i < blog.images.length; i++) {
               await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
          };

          for (let i = 0; i < images.length; i++) {
               const result = await cloudinary.v2.uploader.upload(images[i], {
                   folder: "blogs",
               });
   
               imagesLink.push({
                   public_id: result.public_id,
                   url: result.secure_url,
               });
          };
   
          req.body.images = imagesLink;
     };

     req.body.author = req.user.id;
 
     blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
         useFindAndModify: false,
     });
 
     res.status(201).json({
         success: true,
         blog,
     });
});

const deleteBlog = asyncHandler(async (req, res, next) => {
     const id = req.query.id;

     const blog = await Blog.findById(id);
     if (!blog) return next(new apiError(`No blog for this id ${id}`));

     if (blog.author.toString() !== req.user.id.toString()) {
          return next(new apiError(`You are not allowed to delete this post`, 403));
     };

     await Blog.findByIdAndDelete(id);

     await User.findByIdAndUpdate(req.user._d, {
            $pull: { blogs: blog._id },
     }, { new: true });

     res.status(200).json({
          success: true,
          deleteBlog,
     });
});

module.exports = { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog };