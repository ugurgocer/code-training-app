const AuthError = require('./auth.error')
const ImageUploadError = require('./imageUpload.error')
const ValidationError = require('./validation.error')
const { UniqueError } = require('./db.error')

module.exports = {
    AuthError,
    ValidationError,
    UniqueError,
    ImageUploadError
}