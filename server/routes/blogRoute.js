const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require("../controllers/blogCtrl.js");
const { authMiddleware, authRoles } = require("../middlewares/auth.js");

router.post("/add/blog", authMiddleware, createBlog);

router.get("/blogs", getAllBlogs);
router.get("/blog/detail/:id", getBlog);

router.put("/blog/update/:id", authMiddleware, updateBlog);

router.delete("/blog/delete", authMiddleware, deleteBlog);

module.exports = router;