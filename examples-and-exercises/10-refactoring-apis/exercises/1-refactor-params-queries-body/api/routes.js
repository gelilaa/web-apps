const handlers = require('./handlers.js');
const express = require('express');

// create the router
const router= express.Router();

router.use((req, res, next) => {
  console.log('routes!');
  next();
});

router.get('/', (req, res) => {
  res.send('routes!');
});

// write the routes!

router.post('/:value',handlers.readValues);

module.exports = router;
