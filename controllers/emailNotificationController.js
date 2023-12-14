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

exports.sendPropertyUpdate = async (propertyDetails) => {

    console.log("Sending update Property Email 1: ");

    console.log(propertyDetails);

    const {
        to_email,
        fullname,
        verified,
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

        let verificationMessage;
        let messageColor;

        if (verified === 1) {
            verificationMessage = '<p><strong style="color: green;">Congratulations, your property is APPROVED.</strong></p>';
            messageColor = '#333';
        } else if (verified === 2) {
            verificationMessage = '<p><strong style="color: red;">Unfortunately, your property has been REJECTED.</strong></p>';
            messageColor = '#555';
        } else {
            verificationMessage = '<p><strong>Property verification status unknown.</strong></p>';
            messageColor = '#000';
        }

        console.log("Sending update Property Email 2: ");

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: to_email,
            subject: 'Notification: Property Verification Update',
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
                                color: ${messageColor};
                            }
                            p {
                                color: ${messageColor};
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Hello ${fullname},</h2>
                            ${verificationMessage}
                            <p>A property update has been received with the following details:</p>
                            ${propertiesHTML}
                            <p>Best regards.</p>
                            <p>Admin</p>
                            <p></p>
                        </div>
                    </body>
                </html>
            `,
        };

        const sendEmail = await transporter.sendMail(mailOptions);

        return {
            status: true,
            message: 'Email notification sent successfully.'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
};

exports.sendUserUpdate = async (userDetails) => {

    console.log("Sending update user Email 1: ");

    console.log(userDetails);

    const {
        to_email,
        fullname,
        verified
    } = userDetails;

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

        let verificationMessage;
        let messageColor;

        if (verified === 1) {
            verificationMessage = '<p>Congratulations, you are <strong style="color: green;">APPROVED.</strong></p>';
            messageColor = '#333';
        } else if (verified === 2) {
            verificationMessage = '<p>Unfortunately, you are <strong style="color: red;">REJECTED.</strong></p>';
            messageColor = '#555';
        } else {
            verificationMessage = '<p><strong>User verification status unknown.</strong></p>';
            messageColor = '#000';
        }

        console.log("Sending update Property Email 2: ");

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: to_email,
            subject: 'Notification: User Verification Update',
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
                                color: ${messageColor};
                            }
                            p {
                                color: ${messageColor};
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Hello ${fullname},</h2>
                            ${verificationMessage}
                            <p>Best regards.</p>
                            <p>Admin</p>
                            <p></p>
                        </div>
                    </body>
                </html>
            `,
        };

        const sendEmail = await transporter.sendMail(mailOptions);

        return {
            status: true,
            message: 'Email notification sent successfully.'
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
};

exports.sendRequestInfo = async (req, res) => {
    const { landlord, fullname, from_email, to_email, phone } = req.body;

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
                            <h2>Hello ${landlord},</h2>
                            <p>${fullname} with email ${from_email} would like to request information regarding the property you listed.</p>
                            <p>${fullname} can be reached through ${phone} for more details.</p>
                            <p>Thank you.</p>
                        </div>
                    </body>
                </html>
            `,
        };

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
