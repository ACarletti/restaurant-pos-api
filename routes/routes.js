const express = require('express')

const Order = require('../models/Order')
const Item = require('../models/Item')
const router = express.Router()

router.get('/orders/all', (req, res, next) => {
  req.app.locals.db.collection('orders').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No orders were found'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/items/all', (req, res, next) => {
  req.app.locals.db.collection('orders').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No items were found'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/orders/:id', (req, res, next) => {
  req.app.locals.db.collection('orders').findOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No orders were found''})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/items/:id', (req, res, next) => {
  req.app.locals.db.collection('orders').findOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No items were found''})
    } else {
      res.status(200).send(result)
    }
  })
})

router.post('/orders/new', (req, res, next) => {
  const newOrder = new Order(req.body.status, req.body.items)
  req.app.locals.db.collection('orders').insertOne({
    newOrder
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.delete('/orders/delete/:id', (req, res, next) => {
  req.app.locals.db.collection('orders').deleteOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.patch('/orders/edit/:id', (req, res, next) => {
  req.app.locals.db.collection('orders').updateOne({
    '_id': req.params.id
  }, 
  {$set:
    {
      status: req.body.status,
      items: req.body.items
    }
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router
