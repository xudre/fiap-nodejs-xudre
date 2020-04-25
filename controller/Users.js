const UsersModel = require('../model/Users');
const usersModel = new UsersModel();

class Users {
    get(req, res) {
        const { id } = req.params;

        usersModel.get(id)
        .then(user => {
            if (!user.exists) {
                res.status(404).send({
                    message: 'User no found'
                });
            }

            res.json(user.data());
        })
        .catch(error => {
            res.status(500).send(error);
        })
    }
}

module.exports = Users;
