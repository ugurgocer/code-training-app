const { tr, en } = require('../messages/index')

class DBError extends Error {
    constructor(name){
        super()

        this.name = name
        this.stack = ""
    }
}

class UniqueError  extends DBError {
    constructor(error, lang = 'tr'){
        super(lang === 'tr' ? 'Veritabanı Hatası' : 'Database Hatası')
        const database = lang === 'tr' ? tr.database : en.database

        this.message = database.unique(error.field, error.value)
    }
}

module.exports = {
    UniqueError
}