const secretKey = require('secret-key');
const dotenv = require('dotenv');

dotenv.config();

console.log(secretKey.create(process.argv[2] ?? process.env.SECRET_KEY));
