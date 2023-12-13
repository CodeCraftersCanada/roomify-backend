require('dotenv').config();

const nodemailer = require('nodemailer');

exports.sendRequestInfo = async (req, res) => {
    const { fullname, from_email, to_email, phone } = req.body;

    try {
        // Send email notification using nodemailer and Mailtrap
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: from_email,
            to: to_email,
            subject: 'Notification: Request Info',
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            }
                            h2 {
                                color: #333;
                            }
                            p {
                                color: #555;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Hello,</h2>
                            <p>${fullname} with email ${from_email} would like to request information regarding the property you listed.</p>
                            <p>${fullname} can be reached through ${phone} for more details.</p>
                            <p>Best regards,</p>
                            <p>Your Name</p>
                        </div>
                    </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: true,
            message: 'Email notification sent successfully.'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
