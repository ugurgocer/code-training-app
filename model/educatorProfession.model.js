
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const EducatorModel = require('./educator.model')
const UserModel = require('./user.model')

class EducatorProfession extends Model {}

EducatorProfession.init({
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    educatorId: {
        type: DataTypes.INTEGER,
        field: 'educator_id',
        references: {
            model: EducatorModel,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {
    modelName: 'educator_professions',
    sequelize
})

module.exports = EducatorProfession