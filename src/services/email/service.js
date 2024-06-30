import nodemailer from "nodemailer";

const WEB_URL = process.env.WEB_URL || "http://localhost:5731";
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@anywork.dev";
const CONTACT_SUPPORT = process.env.CONTACT_SUPPORT || "no-reply@anywork.dev";
const EMAIL_SMTP_HOST = process.env.EMAIL_SMTP_HOST || "mail.anwork.dev";
const EMAIL_SMTP_PORT = process.env.EMAIL_SMTP_PORT || 465;
const EMAIL_SMTP_USER = process.env.EMAIL_SMTP_USER || "username";
const EMAIL_SMTP_PASSWORD = process.env.EMAIL_SMTP_PASSWORD || "password";

// Create a transporter
let transporter = nodemailer.createTransport({
  host: EMAIL_SMTP_HOST, // Replace with your SMTP server
  port: EMAIL_SMTP_PORT, // Usually 587 for TLS, 465 for SSL
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL_SMTP_USER, // Your email address
    pass: EMAIL_SMTP_PASSWORD, // Your email password
  },
});

// Set up email data

const mailOption = (options) => ({
  from: `"Aplikasi Notaris" <${FROM_EMAIL}>`, // Sender address
  to: "recipient-email@example.com", // List of recipients
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // Plain text body
  html: "<b>Hello world?</b>",
  ...options,
});

class EmailService {
  static async sendConfirmation({ to, code }) {
    const confirmationLink = new URL(`${WEB_URL}/confirm_registration`);
    confirmationLink.searchParams.append("confirm_id", code);

    const subject = `Konfirmasi Alamat Email Anda untuk ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan`;
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              margin: 50px auto;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              margin-top: 30px;
              color: #777777;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Konfirmasi Alamat Email</h1>
            <p>Yth. Pengguna,</p>
            <p>Terima kasih telah mendaftar di ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan. Silakan konfirmasi alamat email Anda dengan mengklik tautan di bawah ini:</p>
            <p><a href="${confirmationLink}" class="button">Konfirmasi Alamat Email</a></p>
            <p>Jika Anda tidak mendaftar akun ini, Anda dapat mengabaikan email ini.</p>
            <p class="footer">Hormat kami,<br>Tim ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan</p>
          </div>
        </body>
      </html>
    `;

    const text = html.replace(/<\/?[^>]+(>|$)/g, "");

    // Send mail
    return await transporter.sendMail(mailOption({ to, subject, html, text }));
  }

  static async sendRecovery({ to, code }) {
    const RECOVERY_LINK = new URL(`${WEB_URL}/confirm_invitation`);
    RECOVERY_LINK.searchParams.append("token", code);

    const subject = `Reset Kata Sandi Anda di ZULFIKAR, SH., M.Kn. Notaris Kota PadangsidimpuanUndangan Menjadi Anggota di ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan`;
    const html = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          background-color: #ffffff;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #555555;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          margin-top: 30px;
          color: #777777;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Reset Kata Sandi</h1>
        <p>Yth. Pengguna,</p>
        <p>Kami menerima permintaan untuk mereset kata sandi akun Anda di ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan. Silakan klik tautan di bawah ini untuk mereset kata sandi Anda:</p>
        <p><a href="${RECOVERY_LINK}" class="button">Reset Kata Sandi</a></p>
        <p>Jika Anda tidak meminta reset kata sandi ini, Anda dapat mengabaikan email ini.</p>
        <p class="footer">Hormat kami,<br>Tim ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan</p>
      </div>
    </body>
  </html>
  `;

    const text = html.replace(/<\/?[^>]+(>|$)/g, "");

    // Send mail
    return await transporter.sendMail(mailOption({ to, subject, html, text }));
  }

  static async sendInvitation({ to, code }) {
    const INVITATION_LINK = new URL(`${WEB_URL}/confirm_invitation`);
    INVITATION_LINK.searchParams.append("token", code);

    const subject = `Undangan Menjadi Anggota di ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan`;
    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
          }
          h1 {
            color: #333333;
          }
          p {
            color: #555555;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
          }
          .footer {
            margin-top: 30px;
            color: #777777;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Undangan Menjadi Anggota</h1>
          <p>Yth. Calon Anggota,</p>
          <p>Kami dengan senang hati mengundang Anda untuk menjadi anggota di ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan. Klik tautan di bawah ini untuk menerima undangan dan melengkapi pendaftaran Anda:</p>
          <p><a href="${INVITATION_LINK}" class="button">Terima Undangan</a></p>
          <p>Jika Anda tidak mengajukan permintaan ini, Anda dapat mengabaikan email ini.</p>
          <p class="footer">Hormat kami,<br>Tim ZULFIKAR, SH., M.Kn. Notaris Kota Padangsidimpuan</p>
        </div>
      </body>
    </html>
  `;

    const text = html.replace(/<\/?[^>]+(>|$)/g, "");

    // Send mail
    return await transporter.sendMail(mailOption({ to, subject, html, text }));
  }
}

// Exporting AuthService for external use
export default EmailService;
