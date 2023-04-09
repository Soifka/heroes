'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate({ Superhero }) {
            Image.belongsTo(Superhero, {
                foreignKey: 'superheroId'
            })
        } 
    }
    Image.init(
        {
            path: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            }
        },
        {
            sequelize,
            modelName: 'Image',
            tableName: 'images',
            underscored: true
        }
    );
    return Image;
}    