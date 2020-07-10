const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../lib/db.constructor')
const bcrypt = require('bcrypt')

class User extends Model {}

User.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fullname',
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: ['3', '50']
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: ['6', '255']
        },
    },
    isEducator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_educator'
    }
}, {
    modelName: 'users',
    sequelize,
    hooks: {
        afterValidate: user => {
            if(user.password){
                const salt = bcrypt.genSaltSync(8)

                user.password = bcrypt.hashSync(user.password, salt)
            }
        }
    }
})

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = User