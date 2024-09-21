import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tanmay.chavan@walchandsangli.ac.in', // your email
        pass: 'keoj shna idki tajx',  // your email password
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'tanmay.chavan@walchandsangli.ac.in', // sender address
        to: to,                       // receiver address
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

export {sendEmail}
