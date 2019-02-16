exports.nodemailer = {
  user: 'USER',
  pass: 'PASS',
  // service: 'SERVICE', // SendGrid | gmail | FastMail etc
  host: 'smtp.ethereal.email',
};

exports.server = {
  port: process.env.PORT || 3000,
};
