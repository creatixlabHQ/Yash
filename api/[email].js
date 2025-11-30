import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const {
    name,
    email,
    message,
    subject = "New Form Submission"
  } = req.body;

  // URL se email nikaal rahe hain (dynamic)
  const toMail = req.query.email;

  if (!toMail) {
    return res.status(400).json({ error: "Email missing in URL" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  if (!email || !message) {
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
      from: `Form API <${process.env.MY_MAIL}>`,
      to: toMail,
      subject: subject,
      html: `
        <h3>New Form Submission</h3>
        <p><b>Name:</b> ${name || "Anonymous"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    res.status(200).json({
      success: true,
      to: toMail
    });

  } catch (error) {
    res.status(500).json({
      error: "Mail sending failed",
      details: error.message
    });
  }
}
