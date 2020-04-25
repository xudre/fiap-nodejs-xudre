const jwt = require('jsonwebtoken');
const ApiError = require('../class/ApiError');

const verifyToken = (req, res, next) => {
    const auth = /^JWT (.+)$/i.exec(req.headers.authorization);

    if (!auth) {
        return res.status(401).send(new ApiError('Token não encontrado', 'token_not_found'));
    }

    const token = auth[1];

    jwt.verify(token, process.env.SECRET, (error, decode) => {
        if (error) {
            return res.status(401).send(new ApiError('Não autorizado', 'not_authorized'));
        }

        // Trafegando dados do usuário autenticado entre as requests:
        res.locals.user = decode;

        next();
    });
};

module.exports = verifyToken;
