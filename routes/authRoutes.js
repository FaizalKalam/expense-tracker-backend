import express from "express";
import { dashboard, loginUser, registerUser,updateProfile } from "../controllers/authController.js";
import { checkToken } from "../controllers/checkToken.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);



// Optional, but useful for route guarding
router.get("/verify-token", verifyToken, checkToken );

// dashboard
router.get("/dashboard", verifyToken, dashboard );

// update user
router.put('/update-user', verifyToken, updateProfile);

  export default router;