
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')

class EducatorProfession extends Model {}

EducatorProfession.init({
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    educator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    modelName: 'educator_professions',
    sequelize
})

module.exports = EducatorProfession