const crypto = require('crypto');

const cryptoPassword = (password) => {
    const hash = crypto.createHmac('sha512', process.env.SECRET);

    hash.update(password);

    return hash.digest('hex');
};

module.exports = cryptoPassword;
