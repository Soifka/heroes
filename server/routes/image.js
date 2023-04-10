const imageRouter = require('express').Router({mergeParams: true});
const ImageController = require('../controllers/imageController');
const { imagesUpload } = require('../middlewares/imagesUpload');

imageRouter
.route('/')
.get(ImageController.getHeroImages)
.post(imagesUpload, ImageController.addHeroImages);

imageRouter
.route('/:imageId')
.get(ImageController.getImage)
.delete(ImageController.deleteImage);

module.exports = imageRouter;