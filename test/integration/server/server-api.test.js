import supertest from 'supertest'
import server from 'server-instance'
import { setRoutes, rootRouter } from 'server/router'
import dotenv from 'dotenv'

describe(`Server API`, function () {
  const app = helpers.cloneApp(server)

  before(() => {
    setRoutes()
    app.use(rootRouter.routes())
  })

  const body = { test: 'body' }

  it(`responds to ping route`, () =>
    supertest(app.callback())
      .post('/api/ping')
      .send(body)
      .expect('content-type', /application\/json/)
      .expect({ pong: body })
  )

  it(`responds to the bar route`, () =>
    supertest(app.callback())
      .get('/api/bar')
      .expect('content-type', /application\/json/)
      .expect({ bar: [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet' ] })
  )
  
  describe('/update_db', () => {
    it(`do not allow get`, () => {
      supertest(app.callback())
        .get('/api/update_db')
        .expect('Content-Type', /json/)
        .expect(404)
    })
    
    it(`unauthorizes random passwords for /update_db`, () => {
      supertest(app.callback())
        .post('/api/update_db')
        .expect('Content-Type', /json/)
        .send({ 'password': 'sdklfjalkdfaklfjaklj' })
        .expect(404)
    })
    
    it(`allows login using .env password`, () => {
      dotenv.config()
      
      supertest(app.callback())
        .post('/api/update_db')
        .send({ password: process.env.DB_UPDATE_PASSWORD })
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
})
