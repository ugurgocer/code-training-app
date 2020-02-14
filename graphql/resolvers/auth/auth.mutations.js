const db = require('./../../../model/index')
const moment = require('moment')
const { AuthError } = require('./../../../utils/errors/index')
const { Op } = require('sequelize')

const register = async ( _, { register }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try{
            const user = await db.User.create(register, { transaction: trx })

            const token = await db.Token.create({
                userId: user.id,
                expiryDate: moment().add('1', 'Month')
            }, { transaction: trx })

            return {
                ...token.toJSON(),
                date: token.createdAt
            }

        }catch(err){
            throw err
        }
    })
}

const login = async (_, { login }, { req }, info) => {
    try{
        const user = await db.User.findOne({ where: { email: login.email } })

        if(!user)
            throw new AuthError("Bu e-posta ile kayıt olmuş bir kullanıcı yoktur.")

        if(!user.validPassword(login.password))
            throw new AuthError("Girmiş olduğunuz parola yanlıştır.")

        const token = await db.Token.findCreateFind({
            where: {
                userId: user.id,
                expiryDate: {
                    [Op.gte]: moment().toDate()
                }
            },
            defaults: {
                expiryDate: moment().add(1, 'month').toDate()
            }
        })

        return {
            ...token[0].toJSON(),
            date: token[0].createdAt
        }
    }catch(err){
        throw err
    }
}

module.exports = {
    register,
    login
}