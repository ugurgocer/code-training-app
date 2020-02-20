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
    }
}


module.exports = {
    parseError
}