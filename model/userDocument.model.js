const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const UserModel = require('./user.model')
const DocumentModel = require('./document.model')

class UserDocument extends Model {}

UserDocument.init({
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_completed'
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    output: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    modelName: 'user_documents',
    sequelize,
    indexes: [
        {
            unique: true,
            fields: ['documentId', 'userId']
        }
    ]
})

UserDocument.belongsTo(UserModel, {
    onDelete: 'cascade',
    hooks: true
})

UserDocument.belongsTo(DocumentModel, {
    onDelete: 'cascade',
    hooks: true
})


module.exports = UserDocument