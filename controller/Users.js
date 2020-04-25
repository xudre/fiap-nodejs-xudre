const ApiError = require('../class/ApiError');
const UsersModel = require('../model/Users');
const usersModel = new UsersModel();

class Users {
    get(req, res) {
        const { id } = req.params;

        usersModel
            .get(id)
            .then((user) => {
                if (!user.exists) {
                    return res.status(404).send(
                        new ApiError('Usuario não encontrado', 'not_found')
                    );
                }

                res.json(user.data());
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }

    post(req, res) {
        const { email, password, name } = req.body;

        const payload = {
            email,
            password,
            name,
        };

        usersModel.add(payload).then((ref) => {
            ref.get().then((snapshot) => {
                const data = snapshot.data();

                delete snapshot.password;

                data.id = ref.id;

                res.status(201).json(data);
            });
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

                delete snapshot.password;

                data.id = ref.id;

                res.json(snapshot);
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
