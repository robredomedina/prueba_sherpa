import request from 'supertest';
import { expect } from 'chai';

import createServer from 'server';
const app = createServer();

describe('server checks', () => {
    it('creates server correctly', (done)=> {
        request(app).get('/').expect(200, done)
    })
})

describe('GET /api/:cp/findAll', () => {
    it('return the correct json type', (done)=> {
        request(app).get('/api/48930/findAll')
        .expect(200)
        .end((err, res) => {
            const body = res.body
            expect(body).to.haveOwnProperty('error')
            expect(body).to.haveOwnProperty('data')
            expect(body).to.haveOwnProperty('description')
            done()
           })
    })
    it('returns no data if cp has no data', (done)=> {
        request(app).get('/api/00000/findAll')
        .expect(200)
        .end((err, res) => {
            const body = res.body
            console.log(body.data)
            expect(body.data).length(0)
            done()
           })
    })
})

describe('DELETE /api/:cp/deleteAll', () => {
    it('return the correct json type', (done)=> {
        request(app).delete('/api/48930/deleteAll')
        .expect(200)
        .end((err, res) => {
            const body = res.body
            expect(body).to.haveOwnProperty('error')
            expect(body).to.haveOwnProperty('data')
            expect(body).to.haveOwnProperty('description')
            done()
           })
    })
})
