const jwt = require('jsonwebtoken');

const createToken = (data, expiresIn = '24h') => {
    if (!process.env.SECRET) {
        throw new Error('No secret was found');
    }

    return jwt.sign(data, process.env.SECRET, { expiresIn });
};

module.exports = createToken;
