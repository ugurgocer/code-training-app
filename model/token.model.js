const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../lib/db.constructor')

class Token extends Model {}

Token.init({
    token: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },
    expiryDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'expiry_date',
    },
}, {
    modelName: 'tokens',
    sequelize
})

module.exports = Token