import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  console.log("REQ BODY →", req.body);

  const { name, email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.9198951281shubham@gmail.com,
        pass: process.env.fryy sjdz jvev qfre
      }
    });

    await transporter.sendMail({
      from: process.env.MY_MAIL,
      replyTo: email,
      to: process.env.MY_MAIL,
      subject: "New Form Submission",
      text: `Name: ${name}\nEmail: ${email}`
    });

    return res.status(200).json({ message: "Email sent!" });
  } catch (err) {
    console.error("EMAIL ERROR →", err);
    return res.status(500).json({ error: err.message });
  }
}
