
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')

class ImageStorage extends Model {}

ImageStorage.init({
    response: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    modelName: 'image_storage',
    sequelize
})

module.exports = ImageStorage