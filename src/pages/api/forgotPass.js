import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
    try {
        await connectMongo();

        function generateRandomString(length) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
        const token = generateRandomString(15);
        const { email, sendMail } = req.body;

        await Users.findOneAndUpdate(
            { email },
            { token },
            { new: true }
        );

        const user = await Users.findOne({ email });
        const setToken = user.token;

        const emailContent = `
            We have sent you this email in response to your request to reset your password on This Project.

            To reset your password, please follow the link below:

            <a href="http://localhost:3000/ForgotPass?token=${setToken}">Click Here To Reset Your Password</a>

            <br/><br/>

            We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised,
            you can change it by going to your My Account Page and Change your Password.`;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: req.body.email,
            from: 'smiu.dev@gmail.com',
            subject: 'Email For Password Reset',
            text: emailContent,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent Successfully');
        } catch (error) {
            console.error("Error While Sending Mail", error);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
