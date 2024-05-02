const nodemailer = require('nodemailer');

const sendEmail = (empEmail, empID, empName, empPosition) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'notifymassage@gmail.com',
            pass: 'mnoe wzuu tydl yerr'
        }
    });

    const mailOptions = {
        from: 'notifymassage@gmail.com',
        to: empEmail,
        subject: `Employee Registration of KDU`,
        text: `Hi ${empName}, You ware registered as a ${empPosition} of KDU and ${empID} is your employee ID. Now, you can login to employee management system using this email address(${empEmail}). Please use your NIC as the password and you can change it later.`
    };
    console.log(empEmail)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendEmail };
