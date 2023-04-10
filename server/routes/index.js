const router = require('express').Router();
const heroRouter = require('./superhero');

router.use('/superheroes', heroRouter);

module.exports = router;