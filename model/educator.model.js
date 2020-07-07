const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')

class Educator extends Model {}

Educator.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: ['3', '50']
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: ['0', '500']
        }
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'profile_picture',
    },
    lastLoginDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login_date'
    }
}, {
    modelName: 'educators',
    sequelize
})

module.exports = Educator