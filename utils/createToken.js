const jwt = require('jsonwebtoken');

const createToken = (data, expiresIn = '24h', secret = process.env.SECRET) => {
    if (!secret) {
        throw new Error('No secret was found');
    }

    return jwt.sign(data, secret, { expiresIn });
};

module.exports = createToken;
