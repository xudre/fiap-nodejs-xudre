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
                    return res.status(401).send(
                        new ApiError('Usuario não autorizado', 'not_authorized')
                    );
                }

                const user = users.docs[0].data();

                delete user.password;

                res.json({
                    token: createToken(user)
                });
            })
            .catch((error) => {
                res.status(500).send(error);
                console.error(error);
            });
    }
}

module.exports = Auth;
