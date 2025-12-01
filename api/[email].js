import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  // dynamic email from URL
  const { email } = req.query;

  const { name, senderEmail, message } = req.body;

  // Validation
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

    const mailOptions = {
      from: senderEmail,
      to: email,
      subject: `Message from ${name}`,
      text: message
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: "Email sent successfully ✅" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
