
var nodemailer = require("nodemailer");

function sendResetLink(email,otp){
var from = 'seproject101@gmail.com';
var to = email;
var otp= otp;
var subject = "reset password";
var message = "To reset your password, use this otp "+otp;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seproject101@gmail.com',
      pass: 'vtsdoztbdlbfynlm'
    }
})
//  console.log("+++++++++++++++++++++++++++++hi hi",email);

var mailOptions = {
    from: 'seproject101@gmail.com',
    to:'seproject101@gmail.com',
    subject:"reset password",
    text:"To reset your password, use this otp  "+otp,
}

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log("Email Sent: " + info.response);
    }
    response.redirect("/");
})

}
 
module.exports = sendResetLink;
