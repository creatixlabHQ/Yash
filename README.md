# Author: Shubham

## Mailing API - yash-wine

Ye project ek simple **mailing API** hai jo form submissions ko email ke through forward karta hai.  
Ye **Next.js API route** me bana hai aur `nodemailer` library ka use karta hai.

---

## 🔹 Features

- Sirf **POST requests** allow hoti hain  
- Form ke data ko dynamically **email body** me include karta hai  
- Extra fields ko bhi capture karke email me attach karta hai  
- **Reply-To** header set karta hai taaki form submit karne wale ko reply karna easy ho  
- Error handling included hai — agar email send nahi hota, API **500 status** return karta hai  

---

## 🔹 API Code (Next.js)

```javascript
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { email } = req.query; // receiver (owner) email
  const { name, senderEmail, message, ...rest } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASS
      }
    });

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
