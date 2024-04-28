const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
//   port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "driftcapstone@gmail.com",
    pass: "dbsiyjfgxhgtqbas",
  },
});

export async function sendEmail(emailAddress: string, emailText: string) {
    const info = await transporter.sendMail({
        from: 'drift@gmail.com', 
        to: emailAddress, 
        subject: "Password Reset Requested",
        text: emailText,
        // html: "<b>Hello world?</b>", 
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}