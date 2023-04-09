'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Superpower extends Model {
        static associate({ Superhero }) {
            Superpower.belongsTo(Superhero, {
                foreignKey: 'superheroId'
            })
        } 
    }
    Superpower.init(
        {
            name: {
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
            modelName: 'Superpower',
            tableName: 'superpowers',
            underscored: true
        }
    );
    return Superpower;
}    