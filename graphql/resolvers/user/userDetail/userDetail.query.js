const db = require('./../../../../model/index')
const { regular } = require('./../../../../utils/helpers/middleware')

const getUserDetail = async(_, { userId }, { req }, info) => {
    regular(req)

    try {
        const result = await db.UserDetail.findOne({ where: { userId } })
        
        console.log(userId)
        if(result)
            return {
                ...result.toJSON(),
                userId
            }
        else
            return {
                userId
            }
    } catch (err) {
        throw err
    }
}

module.exports = {
    getUserDetail
}