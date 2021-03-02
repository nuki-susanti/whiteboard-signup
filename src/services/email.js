const nodemailer = require('nodemailer');
const pug = require('pug');

const { EMAIL_FROM, EMAIL_PASS } = process.env;



module.exports = async function sendMail(name, email, url) {

    //Create nodemailer function
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_FROM,
            pass: EMAIL_PASS
        }
    });

    //Render HTML based on PUG template
    const html = pug.renderFile(__dirname + '/../../views/resetPass.pug', {
        name: name,
        url
    });

    const mailOptions = {
        to: email,
        subject: 'Reset your WHITEBOARD account password',
        html
    };

    //Send email
    const result = await transport.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }else{
            console.log('Message sent: ' + info.response);  
        }
    });
    return result               
};