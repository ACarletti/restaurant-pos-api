const test = require('tape')
const request = require('supertest')
const express = require('express')

const Order = require('../models/Order')
const Item = require('../models/Item')
const app = require('../index')
let documentId

before(done => {
  app.on( 'APP_STARTED', () => {
    done()
  })
})

describe('API Unit Test', () => {
  it('Runs all tests', done => {
    test('/api/orders/new', assert => {
      request(app)
        .post('/api/orders/new')
        .send(new Document('Processing', '{"name":"Coke", "type":"Drink", "Price":"5.99"}'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Created a new order successfully')
          assert.end()
        })
    })

    test('/api/items/new', assert => {
      request(app)
        .post('/api/items/new')
        .send(new Item('Coke', 'Drink', '5.99'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Created a new item successfully')
          assert.end()
        })
    })

    test('/api/orders/all', assert => {
      request(app)
        .get('/api/orders/all')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          orderId = res.body[0]._id
          assert.pass('Retrieved all orders successfully')
          assert.end()
        })
    })

	test('/api/items/all', assert => {
      request(app)
        .get('/api/items/all')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          itemId = res.body[0]._id
          assert.pass('Retrieved all items successfully')
          assert.end()
        })
    })

    test('/api/orders/:id', assert => {
      request(app)
        .get(`/api/orders/${orderId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Retrieved a specific order successfully')
          assert.end()
        })
    })

	test('/api/items/:id', assert => {
      request(app)
        .get(`/api/items/${itemId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Retrieved a specific item successfully')
          assert.end()
        })
    })

    test('/api/orders/edit/:id', assert => {
      request(app)
        .patch(`/api/orders/edit/${ordersId}`)
        .send(new Document('Done'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Edited an order successfully')
          assert.end()
        })
    })

    test('/api/orders/delete/:id', assert => {
      request(app)
        .delete(`/api/orders/delete/${ordersId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Deleted a specific order successfully')
          assert.end()
          done()
        })
    })
  })
})
