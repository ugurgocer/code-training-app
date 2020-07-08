const User = require('./user.model')
const Educator = require('./educator.model')
const EducatorProfession = require('./educatorProfession.model')
const Course = require('./course.model')
const Token = require('./token.model')
const sequelize = require('./../lib/db.constructor')

module.exports = {
    User,
    Educator,
    EducatorProfession,
    Course,
    Token,
    sequelize
}