const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Replace with your SendGrid API key
const SENDGRID_API_KEY = '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';

// Create a Nodemailer transporter using SendGrid
const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        pass: SENDGRID_API_KEY,
    },
});

// Firebase Cloud Function to send an email
exports.sendOrderConfirmationEmail = functions.database.ref('/orders/{orderId}')
    .onCreate((snapshot, context) => {
        const orderData = snapshot.val();

        const mailOptions = {
            from: 'biboofficial256@gmail.com',
            to: orderData.userEmail,
            subject: 'Order Confirmation',
            html: `<p>Thank you for your order!</p><p>Order ID: ${orderData.orderId}</p>`,
        };

        // Send the email
        return transporter.sendMail(mailOptions)
            .then(() => console.log('Order confirmation email sent!'))
            .catch(error => console.error('Error sending email:', error));
    });
