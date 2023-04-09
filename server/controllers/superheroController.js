const { Superhero, Superpower, Image } = require('../models');
const createHttpError = require('http-errors');

module.exports.createHero = async(req, res, next) => {
    try {
        const { body, files } = req;

        const hero = await Superhero.create(body);

        if(!hero) {
            return next(createHttpError(400));
        }

        if(files?.length) {
            const images = files.map(file => ({
                path: file.filename,
                superheroId: hero.id 
            }));

            await Image.bulkCreate(images, {
                retirning: true
            })
        }

        if(body?.superpowers?.length) {
            const powers = body.superpowers.map(power => ({
                name: power,
                superheroId: hero.id 
            }));

            await Superpower.bulkCreate(powers, {
                returning: true
            })
        }

        const heroWithData = await Superhero.findAll({
            where: {
                id: hero.id
            },
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'name'],
                    as: 'superpowers'
                },
                {
                    model: Image,
                    attributes: ['id', 'path'],
                    as: 'images'
                }
            ]
        })

        res.status(201).send({data: heroWithData});
    } catch (err) {
        next(err);
    }
}

