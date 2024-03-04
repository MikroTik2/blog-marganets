const express = require("express");
const router = express.Router();
const { createUser, createUserInGoogle, loginUserInGoogle, loginUser, forgotPassword, logoutUser, getUserDetails, resetPassword, getAllUsers, getSingleUser, updateUserRole, updatePassword, updateProfile, deleteUser } = require("../controllers/userCtrl.js");
const { authMiddleware, authRoles } = require("../middlewares/auth.js");

router.post("/register", createUser);
router.post("/google", createUserInGoogle);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.get("/me", authMiddleware, getUserDetails);
router.get("/users", getAllUsers);
router.get("/admin/single/:id", getSingleUser);
router.get("/logout", logoutUser);

router.put("/me/update", authMiddleware, updateProfile);
router.put("/password/update", authMiddleware, updatePassword);
router.put("/admin/update/:id", authMiddleware, authRoles("admin"), updateUserRole);
router.put("/password/reset/:token", resetPassword);

router.delete("/admin/delete/:id", authRoles("admin"), deleteUser);

module.exports = router;``