const AuthError = require('./auth.error')
const ValidationError = require('./validation.error')
const { UniqueError } = require('./db.error')

module.exports = {
    AuthError,
    ValidationError,
    UniqueError
}