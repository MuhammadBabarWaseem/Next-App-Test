import connectMongo from "../../../database/conn";
import { Users } from "../../../model/Schema";
import bcrypt from "bcrypt"



export default async function Passwordhandler(req, res) {
    try {
        await connectMongo();

        if (req.method === 'POST') {
            const { password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ success: false, error: "Passwords do not match" });
            }

            const token = req.query.token;

            const forgotEntry = await Users.findOne({ token });

            if (!forgotEntry) {
                return res.status(400).json({ success: false, error: "Invalid or expired token" });
            }

            const user = await Users.findOne({ email: forgotEntry.email });

            if (!user) {
                return res.status(400).json({ success: false, error: "User not found" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();


            return res.status(200).json({ success: true, message: "Password has been reset successfully" });
        }
    } catch (err) {
        return res.status(400).json({ err  });
    }
}