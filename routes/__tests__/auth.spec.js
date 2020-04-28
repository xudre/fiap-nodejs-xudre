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
                code: 'not_authorized',
                message: 'Usuario não autorizado'
            }, done);
    });
});
