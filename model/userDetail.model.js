const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../lib/db.constructor')
const UserModel = require('./user.model')
const ImageStorageModel = require('./imageStorage.model')

class UserDetail extends Model {}

UserDetail.init({
    imageId: {
        type: DataTypes.INTEGER,
        field: 'image_id',
        references: {
            model: ImageStorageModel,
            key: 'id'
        }
    },
    resume: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'resume',
        validate: {
            notEmpty: false
        }
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'website',
        validate: {
            notEmpty: false
        }
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'twitter',
        validate: {
            notEmpty: false
        }
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'facebook',
        validate: {
            notEmpty: false
        }
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'linkedin',
        validate: {
            notEmpty: false
        }
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'youtube',
        validate: {
            notEmpty: false
        }
    },
}, {
    modelName: 'user_details',
    sequelize
})

UserDetail.belongsTo(UserModel, {
    onDelete: 'cascade',
    hooks: true
})

module.exports = UserDetail