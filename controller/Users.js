const ApiError = require('../class/ApiError');
const UsersModel = require('../model/Users');
const cryptoPassword = require('../utils/cryptoPassword');

const usersModel = new UsersModel();

class Users {
    get(req, res) {
        const { id } = req.params;

        usersModel
            .get(id)
            .then((user) => {
                if (!user.exists) {
                    return res
                        .status(404)
                        .send(
                            new ApiError('Usuario não encontrado', 'not_found')
                        );
                }

                const data = user.data();

                delete data.password;

                res.json(data);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }

    post(req, res) {
        const { email, password, name } = req.body;

        usersModel
            .getBy([
                {
                    field: 'email',
                    operator: '==',
                    value: email,
                },
            ])
            .then((user) => {
                if (user.empty) {
                    const payload = {
                        email,
                        name,
                        password: cryptoPassword(password),
                    };

                    usersModel.add(payload).then((ref) => {
                        ref.get().then((snapshot) => {
                            const data = snapshot.data();

                            delete data.password;

                            data.id = ref.id;

                            res.status(201).json(data);
                        });
                    });
                } else {
                    res.status(403).send(
                        new ApiError(
                            'Já existe usuário com esse email',
                            'data_conflict'
                        )
                    );
                }
            });
    }

    put(req, res) {
        const { id } = req.params;
        const { password, name } = req.body;

        const payload = {
            password,
            name,
        };

        usersModel.update(id, payload).then((ref) => {
            ref.get().then((snapshot) => {
                const data = snapshot.data();

                delete data.password;

                data.id = ref.id;

                res.json(data);
            });
        });
    }

    delete(req, res) {
        const { id } = req.params;

        usersModel.delete(id).then(() => {
            res.json();
        });
    }
}

module.exports = Users;
