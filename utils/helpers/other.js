const localize = require('../messages/index')
const { ImageUploadError } = require('./../errors/index')
const db = require('./../../model/index')

const parseError = (err, lang="tr") => {
    if(err.name === 'SequelizeValidationError'){
        let errors = err.errors.map(error => ({
            field: localize[lang].fields[error.path],
            value: error.value,
            key: error.validatorKey,
            args: error.validatorArgs
        }))

        return {
            type: 'validate',
            errors
        }
    }else if(err.name === 'SequelizeUniqueConstraintError'){
        const field = /\(([^\(\)]+)\)\=/g.exec(err.original.detail)[1].trim().split(', ')[0]

        let error = {
            field: field.split('"').join(''),
        }

        return {
            type: 'unique',
            error
        }
    }
}

const imageUpload = async (data, trx) => {
    try{
        const result = await db.ImageStorage.create(data, { transaction: trx })
        return result.id
    }catch(err){
        throw new ImageUploadError(err.message)
    }
}

module.exports = {
    parseError,
    imageUpload
}