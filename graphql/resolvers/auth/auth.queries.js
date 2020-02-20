const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const tokenRead = async(_, {}, { req }, info) => {
    regular(req)
    try{
        const token = await db.Token.findOne({ where: { userId: req.account.id, loginType: req.loginType } })

        return {
            ...token.toJSON(),
            date: token.createdAt
        }
    }catch(err){
        throw err
    }
}

module.exports = {
    tokenRead
}