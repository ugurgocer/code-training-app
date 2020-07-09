const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const EducatorModel = require('./educator.model')
const UserModel = require('./user.model')

class Course extends Model {}

Course.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: ['0', '500']
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
    educatorId: {
        type: DataTypes.INTEGER,
        field: 'educator_id',
        references: {
            model: EducatorModel,
            key: 'id'
        }
    },
}, {
    modelName: 'courses',
    sequelize
})

module.exports = Course