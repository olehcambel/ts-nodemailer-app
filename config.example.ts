exports.nodemailer = {
  auth: {
    user: 'USER',
    pass: 'PASS',
  },
  service: 'SERVICE', // SendGrid | gmail | FastMail etc
  // or {host: 'smtp.ethereal.email'}
};

exports.server = {
  port: 3000,
};
