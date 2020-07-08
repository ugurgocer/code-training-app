const AuthError = require('./auth.error')
const EducatorError = require('./educator.error')
const ValidationError = require('./validation.error')
const { UniqueError } = require('./db.error')

module.exports = {
    AuthError,
    EducatorError,
    ValidationError,
    UniqueError
}