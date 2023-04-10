const { Image } = require('../models');
const createHttpError = require('http-errors');

module.exports.getHeroImages = async(req, res, next) => {
    try {
        const { params: { superheroId } } = req;

        const images = await Image.findAll({
            where: {
                superheroId
            }
        });

        res.send({data: images});
    } catch (err) {
        next(err);
    }
}

module.exports.addHeroImages = async(req, res, next) => {
    try {
        const { params: { superheroId }, files } = req;

        const images = files.map(file => ({path: file.filename, superheroId}));
        const newImages = await Image.bulkCreate(images, {returning: true});

        res.status(201).send({data: newImages});
    } catch (err) {
        next(err);
    }
}

module.exports.getImage = async(req, res, next) => {
    try {
        const { params: { superheroId, imageId } } = req;

        const image = await Image.findOne({
            where: {
                superheroId,
                id: imageId
            }
        })

        if(!image) {
            return next(createHttpError(404));
        }

        res.status(200).send({data: image});
    } catch (err) {
        next(err);
    }
}

module.exports.deleteImage = async(req, res, next) => {
    try {
        const { params: { superheroId, imageId } } = req;

        const count = await Image.destroy({
            where: {
                superheroId,
                id: imageId
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