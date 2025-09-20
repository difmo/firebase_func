const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// ================================
// 🚀 Initialize Mail Transporter
// ================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ===========================
// 📩 sendContactForm Function
// ===========================
exports.sendContactForm = functions.https.onRequest((req, res) => {
  const {
    name,
    email,
    subject,
    classes,
    locality,
    city,
    state,
    mode,
    gender,
    message,
  } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'vipndls@gmail.com',
    subject: "📩 New Admission Inquiry – Today's Leads",
    html: `
      <h2>New Admission Inquiry</h2>
      <ul>
        <li><b>Name:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Subject:</b> ${subject}</li>
        <li><b>Class:</b> ${classes}</li>
        <li><b>Locality:</b> ${locality}</li>
        <li><b>City:</b> ${city}</li>
        <li><b>State:</b> ${state}</li>
        <li><b>Mode:</b> ${mode}</li>
        <li><b>Gender:</b> ${gender}</li>
        <li><b>Message:</b> ${message}</li>
      </ul>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email send error:', error.message);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    return res.status(200).json({ message: 'Email sent successfully' });
  });
});

// ================================
// 🎓 sendScholarShipForm Function
// ================================
exports.sendScholarShipForm = functions.https.onRequest((req, res) => {
  const { email, subject,message,stream, classes,target } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: subject,
    html: `
      <ul>
        <h1> ${subject}</h1>
        <h2> ${message}</h2>
        <li><b>Your Streem</b> ${stream}</li>
        <li><b>Classes:</b> ${classes}</li>
        <li><b>Your Target:</b> ${target}</li>
      </ul>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email send error:', error.message);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    return res.status(200).json({ message: 'Email sent successfully' });
  });
});
