const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../lib/db.constructor')
const UserModel = require('./user.model')

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
            model: UserModel,
            key: 'id'
        }
    },
    expiryDate: {
        type: DataTypes.DATE,
        field: 'expiry_date',
    },
    loginType: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: false,
        validate: {
            isIn:  [['regular', 'educator']]
        }
    }
}, {
    modelName: 'tokens',
    sequelize
})

module.exports = Token