const User = require('./user.model')
const Token = require('./token.model')
const sequelize = require('./../lib/db.constructor')

module.exports = {
    User,
    Token,
    sequelize
}