const db = require('./../../../model/index')
const moment = require('moment')
const { AuthError, ValidationError, UniqueError } = require('./../../../utils/errors')
const { regular } = require('./../../../utils/helpers/middleware')
const { Op } = require('sequelize')
const { parseError } = require('./../../../utils/helpers/other')

const register = async (_, { register }, { req }, info)  => {
    return db.sequelize.transaction(async trx => {
        try{
            const user = await db.User.create(register, { transaction: trx })

            const token = await db.Token.create({
                userId: user.id,
                expiryDate: moment().add('1', 'Month'),
                loginType: 'regular'
            }, { transaction: trx })

            return {
                ...token.toJSON(),
                date: token.createdAt
            }

        }catch(err){
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
                else if(customErr.type === 'unique')
                    throw new UniqueError({ ...customErr.error, value: register[customErr.error.field]})
            }else
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
                },
                loginType: user.isEducator ? 'educator' : 'regular'
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

const logout = async (_, args, { req }, info) => {
    regular(req)

    try{
        await db.Token.destroy({ where: { userId: req.account.id } })

        return true
    }catch(err){
        throw err
    }
}
module.exports = {
    register,
    login,
    logout
}