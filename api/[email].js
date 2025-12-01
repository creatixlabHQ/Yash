import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  console.log("BODY →", req.body);

  const { email } = req.query;
  const { name, senderEmail, message } = req.body;

  if (!name || !senderEmail || !message) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASS
      }
    });

    await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: `Message from ${name}`,
      text: message
    });

    return res.status(200).json({ success: "Email sent successfully ✅" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
