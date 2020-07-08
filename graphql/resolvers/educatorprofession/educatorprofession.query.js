const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const educatorProfessionRead = async(_, { _id }, { req }, info) => {
    regular(req)
    try {
        const result = await db.EducatorProfession.findOne({ where: { _id } })
        return result
    } catch (err) {
        throw err
    }
}

const educatorProfessionList = async(_, { filter, sorting, paging }, { }, info) => {
    regular(req)
    try {
        const result = await db.EducatorProfession.findAll()
        return result
    } catch (err) {
        throw err
    }
}
module.exports = {
    educatorProfessionRead,
    educatorProfessionList
}