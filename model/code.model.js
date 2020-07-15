const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const EducatorModel = require('./educator.model')
const UserModel = require('./user.model')
const DocumentModel = require('./document.model')

class Code extends Model {}

Code.init({
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn:  [['xml', 'javascript', 'python']]
        }
    }
}, {
    modelName: 'codes',
    sequelize
})

Code.belongsTo(DocumentModel, {
    onDelete: 'cascade',
    hooks: true
})

Code.belongsTo(EducatorModel, {
    onDelete: 'cascade',
    hooks: true
})

module.exports = Code