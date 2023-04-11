const { Superpower } = require('../models');
const createHttpError = require('http-errors');

module.exports.getHeroPowers = async(req, res, next) => {
    try {
        const { params: { superheroId } } = req;

        const powers = await Superpower.findAll({
            where: {
                superheroId
            }
        });

        res.send({data: powers});
    } catch (err) {
        next(err);
    }
}

module.exports.addHeroPowers = async(req, res, next) => {
    try {
        const { params: { superheroId }, body } = req;

        const powers = body.superpowers.map(name => ({name, superheroId}));
        
        const createdPowers = await Superpower.bulkCreate(powers);

        if(!createdPowers) {
            return next(createHttpError(400));
        }

        res.send({data: createdPowers});
    } catch (err) {
        next(err);
    }
}

module.exports.deletePower = async(req, res, next) => {
    try {
        const { params: { superheroId, superpowerId } } = req;

        const count = await Superpower.destroy({
            where: {
                superheroId,
                id: superpowerId 
            }
        })

        if(count === 0) {
            return next(createHttpError(404));
        }

        res.status(200).end();
    } catch (err) {
        next(err);
    }
}