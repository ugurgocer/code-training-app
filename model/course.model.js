const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const EducatorModel = require('./educator.model')
const ImageStorageModel = require('./imageStorage.model')

class Course extends Model {}

Course.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: ['0', '1000']
        }
    },
    seoLink: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    imageId: {
        type: DataTypes.INTEGER,
        field: 'image_id',
        references: {
            model: ImageStorageModel,
            key: 'id'
        }
    }
}, {
    modelName: 'courses',
    sequelize,
    indexes: [
        {
            unique: true,
            fields: ['title', 'educatorId']
        }
    ]
})

Course.belongsTo(EducatorModel, {
    onDelete: 'cascade',
    hooks: true
})

module.exports = Course