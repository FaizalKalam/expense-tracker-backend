import Expense from "../models/Expense.js";

export const getExpenses = async(req, res, next)=>{
    try {
        const expenses = await Expense.find({userId:req.userId}).sort({date:-1});
        res.status(200).json({ success: true, expenses });
        
    } catch (err) {
        next(err);
        
    }
};

// Add new expense
export const addExpense = async (req, res) => {
    try {
        const expense = new Expense({
          title: req.body.title,
          amount: req.body.amount,
          category: req.body.category,
          date: req.body.date,
          userId: req.userId
        });
    
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense); // ✅ single object
      } catch (err) {
        res.status(400).json({ message: err.message });
      }











    // const { title, amount, category, date } = req.body;
    // try {
    //     const expense = new Expense({
    //         title,
    //         amount,
    //         category,
    //         date,
    //         userId: req.userId
    //     });
    //     const savedExpense = await expense.save();
    //     res.status(201).json(savedExpense);
    // } catch (err) {
    //     res.status(400).json({ message: err.message });
    // }
};