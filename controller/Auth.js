const ApiError = require('../class/ApiError');
const UserModel = require('../model/Users');
const createToken = require('../utils/createToken');

const userModel = new UserModel();

class Auth {
    validate(req, res) {
        const { email, password } = req.body;

        userModel
            .getBy([
                {
                    field: 'email',
                    operator: '==',
                    value: email,
                },
                {
                    field: 'password',
                    operator: '==',
                    value: password,
                },
            ])
            .then((users) => {
                if (users.empty) {
                    res.status(401).send(
                        new ApiError('Usuario não autorizado', 'not_authorized')
                    );

                    return;
                }

                res.json({
                    token: createToken({ id: users.docs[0].id })
                });
            })
            .catch((error) => {
                res.status(500).send(error);
                console.error(error);
            });
    }
}

module.exports = Auth;
