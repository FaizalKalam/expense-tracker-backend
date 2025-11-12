import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    category:{type: String,required:true},
    date:{type: Date,required:true, default: Date.now},
    amount:{type:Number,required:true},
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

const Expense= mongoose.model("Expense", expenseSchema); 
export default Expense;