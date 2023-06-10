import connectMongo from "../../../database/conn";
import { Expense } from "../../../model/Schema";

export default async function handler(req, res) {

    try {
        await connectMongo()

        if (req.method === "POST") {

            const { _id, expenseName, expenseCategory, expenseAmount, userEmail, createdAt } = req.query;
            if (!_id && !expenseName && !expenseCategory && !expenseAmount && !userEmail && !createdAt) {
                res.status(400).json({ error: 'This Parameter Is Not Available' });
                return;
            }

            const query = {};

            if (_id) {
                query._id = _id;
            }

            if (expenseName) {
                query.expenseName = expenseName;
            }

            if (expenseCategory) {
                query.expenseCategory = expenseCategory;
            }

            if (expenseAmount) {
                query.expenseAmount = expenseAmount;
            }

            if (userEmail) {
                query.userEmail = userEmail;
            }

            if (createdAt) {
                query.createdAt = createdAt;
            }

            const expense = await Expense.find(query);

            if (!expense) {
                return res.status(404).json({ error: 'No results found' });
            }

            res.status(201).json({ data: expense });
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (err) {
        res.json({ error: err.message });
    }


}
