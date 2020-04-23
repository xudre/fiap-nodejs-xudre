const firebase = require('firebase');
const firebaseCfg = require('../config/firebase');

const firebaseApp = firebase.initializeApp(firebaseCfg);

class BaseModel {
    constructor() {
        this.db = firebaseApp.firestore();
    }
}

module.exports = BaseModel;
