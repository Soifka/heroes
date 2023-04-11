const heroRouter = require('express').Router();
const imageRouter = require('./image');
const powerRouter = require('./superpower');
const HeroController = require('../controllers/superheroController');
const { imagesUpload } = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');

heroRouter
.route('/')
.get(paginate, HeroController.getHeroes)
.post(imagesUpload, HeroController.createHero);

heroRouter
.route('/:id')
.get(HeroController.getHeroById)
.put(imagesUpload, HeroController.updateHeroById)
.delete(HeroController.deleteHeroById);

heroRouter.use('/:superheroId/images/', imageRouter);

heroRouter.use('/:superheroId/superpowers/', powerRouter);

module.exports = heroRouter;