const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../lib/db.constructor')
const bcrypt = require('bcrypt')
const UserModel = require('./user.model')
const ImageStorageModel = require('./imageStorage.model')

let { User } = require('./user.model') 

class UserDetail extends Model {}

UserDetail.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fullname',
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    imageId: {
        type: DataTypes.INTEGER,
        field: 'image_id',
        references: {
            model: ImageStorageModel,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'title',
        validate: {
            notEmpty: false
        }
    },
    resume: {
        type: DataTypes.STRING,
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

module.exports = UserDetail