const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

//Create class as template email
module.exports = class email {
    constructor(user, url) {
        this.to = user.email,
        this.name = user.name.split(' ')[0],
        this.url = url,
        this.from = `Whiteboard Team <${process.env.EMAIL_FROM}>`;
    };

    newTransport() {
        if(process.env.NODE_ENV === 'development') {
            //Send email using send grid
            return 100;
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });   
    };

    //Create method to send an actual email
    async send(template, subject) {
        //1. Render HTML based on PUG template
        const html = pug.renderFile(`${__dirname}/../../views/${template}.pug`, {
            name: this.name,
            url: this.url,
            subject
        });

        //2. Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        //3. Create a transport and send email
        await this.newTransport().sendMail(mailOptions) //return promise
    };

    //Function to send welcoming email
    async sendWelcome() {
        await this.send('welcome', 'Welcome to WHITEBOARD!')
    };

    //Function to reset password
    async sendResetPass() {
        await this.send('resetPass', 'Reset your WHITEBOARD account password')
    }
};

// const sendEmail = async (options) => {
//     //1. Create a transporter
//     // const transporter = nodemailer.createTransport({
//     //     host: process.env.EMAIL_HOST,
//     //     port: process.env.EMAIL_PORT,
//     //     auth: {
//     //         user: process.env.EMAIL_USERNAME,
//     //         pass: process.env.EMAIL_PASSWORD,
//     //     }
//     // });

//     //2. Define email options
//     // const mailOptions = {
//     //     from: 'Whiteboard Team <team@whiteboard.id>',
//     //     to: options.email,
//     //     subject: options.subject,
//     //     text: options.message
//     // }

//     //3. Send email using nodemailer
//     await transporter.sendMail(mailOptions) //return promise
// }

// module.exports = sendEmail;