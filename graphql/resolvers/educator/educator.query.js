const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const educatorRead = async(_, { username }, { req }, info) => {
    regular(req)
    try {
        const result = await db.Educator.findOne({ where: { username } })
        return result
    } catch (err) {
        throw err
    }
}

const educatorList = async(_, { filter, sorting, paging }, { req }, info) => {
    regular(req)
    try {
        const results = await db.Educator.findAll()

        return {
            educators: results
        }
    } catch (err) {
        throw err
    }
}
module.exports = {
    educatorRead,
    educatorList
}