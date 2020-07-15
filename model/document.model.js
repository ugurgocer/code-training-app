const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const EducatorModel = require('./educator.model')
const CourseSectionModel = require('./courseSection.model')

class Document extends Model {}

Document.init({
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn:  [['xml', 'javascript', 'python']]
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    document: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    modelName: 'documents',
    sequelize
})

Document.belongsTo(EducatorModel, {
    onDelete: 'cascade',
    hooks: true
})

Document.belongsTo(CourseSectionModel, {
    onDelete: 'cascade',
    hooks: true,
    as: 'section'
})

module.exports = Document