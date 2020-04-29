const localize = require('../messages/index')

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
        let error = {
            field: /\(([^\(\)]+)\)\=/g.exec(err.original.detail)[1].trim(),
        }

        return {
            type: 'unique',
            error
        }
    }
}


module.exports = {
    parseError
}