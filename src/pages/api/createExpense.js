import connectMongo from "../../../database/conn";
import { Expense } from "../../../model/Schema";


export default async function handler(req, res) {
    try {
        await connectMongo();

        if (req.method === "POST") {
            const { expenseName, expenseCategory, expenseAmount, userEmail } = req.body;

            if (!expenseName || !expenseCategory || !expenseAmount || !userEmail) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const expense = await Expense.create({ expenseName, expenseCategory, expenseAmount, userEmail });

            res.status(201).json({ data : expense });
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}