const db = require('./../../../model/index')
const moment = require('moment')

const register = async ( _, { register }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try{
            const user = await db.User.create(register, { transaction: trx })

            const token = await db.Token.create({
                userId: user.id,
                expiryDate: moment().add('1 Month')
            }, { transaction: trx })

            return token.toJSON()
        }catch(err){
            throw err
        }
    })
}

module.exports = {
    register
}