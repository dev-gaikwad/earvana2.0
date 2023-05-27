const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const secret = process.env.SECRET_KEY;

const encryptPassword = (plainPassword) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(plainPassword),
    cipher.final(),
  ]);

  return {
    iv: iv.toString('hex'),
    encryptedPassword: encryptedPassword.toString('hex'),
  };
};

const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(secret),
    Buffer.from(encryptedPassword.iv, 'hex')
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryptedPassword.password, 'hex')),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};

module.exports = {
  encryptPassword,
  decryptPassword,
};
