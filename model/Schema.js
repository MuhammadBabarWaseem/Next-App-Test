import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
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

