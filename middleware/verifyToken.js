const jwt = require('jsonwebtoken');
const ApiError = require('../class/ApiError');

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).send(new ApiError('Token não encontrado', 'token_not_found'));
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send(new ApiError('Token não encontrado', 'token_not_found'));
    }

    jwt.verify(token, process.env.SECRET, (error, decode) => {
        if (error) {
            return res.status(401).send(new ApiError('Não autorizado', 'not_authorized'));
        }

        next();
    });
};

module.exports = verifyToken;
