const db = require('./../../../../model/index')
const { regular } = require('./../../../../utils/helpers/middleware')
const Op = require('sequelize').Op

const educatorcourseReport = async(_, { educatorId }, { req, dataLoader }, info) => {
    regular(req)
    try {
        //total course
        const totalCourse = await db.Course.count({ where: { educatorId } })

        //total document
        const totalDocument = await db.Document.count({ where: { educatorId } })

        return {
            totalCourse,
            totalDocument
        }
    } catch (err) {
        throw err
    }
}
module.exports = {
    educatorcourseReport
}