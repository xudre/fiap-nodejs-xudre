const supertest = require('supertest');

const app = require('../../app');

describe('/POST auth', () => {
    it('should generate an user token', done => {
        supertest(app)
            .post('/auth')
            .send({
                email: 'pedro@xudre.com',
                password: '123456'
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.token).not.toBeNull();

                done();
            });
    });

    it('should not have a valid user', done => {
        supertest(app)
            .post('/auth')
            .send({
                email: 'unknown@unknow.com',
                password: 'sem-senha'
            })
            .set('Accept', 'application/json')
            .expect(401, {
                message: 'Usuario não autorizado',
                code: 'not_authorized'
            }, done);
    });

    it('do not have sent valid users credentials', done => {
        supertest(app)
            .post('/auth')
            .send()
            .set('Accept', 'application/json')
            .expect(400, {
                message: 'Email e senha são obrigatórios',
                code: 'no_valid_data'
            }, done);
    });
});
