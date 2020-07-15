const User = require('./user.model')
const Educator = require('./educator.model')
const EducatorProfession = require('./educatorProfession.model')
const Course = require('./course.model')
const CourseSection = require('./courseSection.model')
const Token = require('./token.model')
const ImageStorage = require('./imageStorage.model')
const Code = require('./code.model')
const Document = require('./document.model')

const sequelize = require('./../lib/db.constructor')

module.exports = {
    User,
    Token,
    ImageStorage,
    Educator,
    EducatorProfession,
    Course,
    CourseSection,
    Code,
    Document,
    sequelize
}