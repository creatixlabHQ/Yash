import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_MAIL,   // set in Vercel env
        pass: process.env.MY_PASS    // set in Vercel env (app password)
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MY_MAIL,
      subject: "New Form Submission",
      text: `Name: ${name}\nEmail: ${email}`
    });

    return res.status(200).json({ message: "Email sent!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
