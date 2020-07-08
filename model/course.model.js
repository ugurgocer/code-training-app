const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')

class Course extends Model {}

Course.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: ['0', '500']
        }
    },
}, {
    modelName: 'courses',
    sequelize
})

module.exports = Course