const { tr, en } = require('./../messages/index')

class ValidationError extends Error {
    constructor(errors, lang = 'tr'){
        let message = ""
        super()
        const validation = lang === 'tr' ? tr.validation : en.validation

        errors.forEach(error => {
            if(typeof(validation[error.key]) !== 'function')
                message += validation[error.key]
            else
                message += validation[error.key](error.field, error.args)
        })
        this.message = message
        this.name = lang === 'tr' ? 'Doğrulama Hatası' : 'Validation Error'
        this.stack = ""
    }
}

module.exports = ValidationError