const db = require('./../../../../model/index')
const { regular } = require('./../../../../utils/helpers/middleware')
const Sequelize = require('sequelize');

const getUserDetail = async(_, { userId }, { req }, info) => {
    regular(req)

    try {
        const result = await db.UserDetail.findOne({ where: { userId } })
        
        return {
            userDetail: result
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    getUserDetail
}