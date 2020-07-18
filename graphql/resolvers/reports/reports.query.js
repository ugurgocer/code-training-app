const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const report = async(_, { }, { req, dataLoader }, info) => {
    regular(req)
    try {
        const totalCourse = await db.Course.count({ where: { isPublished: true } })

        const totalDocument = await db.Document.count()

        const totalEducator = await db.Educator.count()

        return {
            totalCourse,
            totalDocument,
            totalEducator
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    report
}