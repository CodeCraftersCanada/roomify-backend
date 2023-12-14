require('dotenv').config();

const nodemailer = require('nodemailer');

exports.sendPropertyCreation = async (propertyDetails) => {
    const {
        to_email,
        fullname,
        name,
        description,
        property_name,
        shared_name,
        guest_number,
        bedroom_number,
        beds_number,
        bathroom_number,
        address1,
        address2,
        city,
        province,
        country,
        postal_code
    } = propertyDetails;

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

        const propertiesDetails = [
            { label: 'Property Name', value: name },
            { label: 'Description', value: description },
            { label: 'Property Name', value: property_name },
            { label: 'Shared Name', value: shared_name },
            { label: 'Guest Number', value: guest_number },
            { label: 'Bedroom Number', value: bedroom_number },
            { label: 'Beds Number', value: beds_number },
            { label: 'Bathroom Number', value: bathroom_number },
            { label: 'Address', value: `${address1}, ${address2}, ${city}, ${province}, ${country}, ${postal_code}` },
        ];

        const propertiesHTML = propertiesDetails.map(detail => `<p><strong>${detail.label}:</strong> ${detail.value}</p>`).join('');

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: to_email,
            subject: 'Notification: New Property Has Been Created',
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
                            <h2>Hello Admin,</h2>
                            <p>A new property has been created with the following details:</p>
                            ${propertiesHTML}
                            <p>Kindly need to verify the property.</p>
                            <p>Best regards.</p>
                            <p>${fullname}</p>
                            <p></p>
                        </div>
                    </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        return {
            status: true,
            message: 'Email notification sent successfully.'
        };
    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};

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
