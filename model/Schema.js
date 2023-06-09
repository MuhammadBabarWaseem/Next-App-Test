import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

const Users = models.user || model('user', userSchema);
export default Users;

const expenseSchema = new Schema({
    expenseName: {
        type: String,
        required: true,
    },
    expenseCategory: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Expense = models.Expense || model('Expense', expenseSchema);
