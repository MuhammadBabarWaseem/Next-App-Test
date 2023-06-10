import { hash } from "bcryptjs";
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";

export default async function handler(req, res) {
    try {
        await connectMongo();

        if (req.method === "POST") {
            const { username, email, password } = req.body;

            const checkExisting = await Users.findOne({ email });
            if (checkExisting) {
                return res.status(422).json({ message: "User Already Exists" });
            }

            const hashedPassword = await hash(password, 12);
            const user = await Users.create({ username, email, password: hashedPassword });

            res.status(201).json({ status: true, user });
        } else {
            res.status(500).json({ message: "HTTP Method not valid. Only POST is accepted." });
        }
    } catch (error) {
        console.error("Error occurred during user registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
