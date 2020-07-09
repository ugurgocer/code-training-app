const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const ImageStorageModel = require('./imageStorage.model')
const UserModel = require('./user.model')

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
        type: DataTypes.INTEGER,
        field: 'image_id',
        references: {
            model: ImageStorageModel,
            key: 'id'
        }
    },
    lastLoginDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login_date'
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: UserModel,
            key: 'id'
        }
    },
}, {
    modelName: 'educators',
    sequelize
})

module.exports = Educator