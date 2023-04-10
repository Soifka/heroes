const powerRouter = require('express').Router({mergeParams: true});
const PowerController = require('../controllers/superpowerController');

powerRouter
.route('/')
.get(PowerController.getHeroPowers)
.post(PowerController.addHeroPowers);

powerRouter.delete('/:superpowerId', PowerController.deletePower);

module.exports = powerRouter;