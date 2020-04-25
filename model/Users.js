const BaseModel = require('./BaseModel');

class Users extends BaseModel {
    constructor() {
        super();
    }

    add(payload) {
        return this.db.collection('users').add(payload);
    }

    get(id) {
        return this.db.collection('users').doc(id).get();
    }

    update(id, payload) {
        return this.db.collection('users').doc(id).set(payload);
    }

    delete(id) {
        return this.db.collection('users').doc(id).delete();
    }

    getBy(conditions) {
        let query = this.db.collection('users');

        conditions.forEach((condition) => {
            query = query.where(
                condition.field,
                condition.operator,
                condition.value
            );
        });

        return query.get();
    }
}

module.exports = Users;
