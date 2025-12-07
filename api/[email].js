import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { email } = req.query; // receiver (owner) email

  // Jo bhi body me aaya, le lo
  const { name, senderEmail, message, ...rest } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASS
      }
    });

    // Dynamic text
    const text = `
New Form Submission

Name: ${name || "Not provided"}
Sender Email: ${senderEmail || "Not provided"}
Message: ${message || "Not provided"}

Extra Data:
${JSON.stringify(rest, null, 2)}
    `;

    await transporter.sendMail({
      from: process.env.MY_MAIL,
      replyTo: senderEmail || process.env.MY_MAIL,
      to: email,
      subject: `New Form Submission - ${email}`,
      text: text
    });

    return res.status(200).json({ success: "Email sent successfully ✅" });

  } catch (err) {
    console.error("ERROR =>", err);
    return res.status(500).json({ error: err.message });
  }
}
