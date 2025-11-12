import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.get('/getExpenses', verifyToken, getExpenses);
router.post('/addExpense', verifyToken, addExpense);

export default router;