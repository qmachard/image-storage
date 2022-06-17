const secretKey = require('secret-key');
const dotenv = require('dotenv');

dotenv.config();

console.log(secretKey.create(process.env.SECRET_KEY));
