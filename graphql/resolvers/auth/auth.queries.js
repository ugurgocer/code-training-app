const db = require('./../../../model/index')
const { regular, educator } = require('./../../../utils/helpers/middleware')

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

const meEducatorInfo = async (_, { }, { req }, info) => {
    educator(req)

    try{
        const educator = await db.Educator.findOne({ where: { userId: req.account.id, id: req.account.educator.id } })
        
        return {
            ...educator.toJSON(),
            educatorId: educator.id
        }
    }catch(err){
        throw err
    }
}

module.exports = {
    tokenRead,
    meEducatorInfo
}