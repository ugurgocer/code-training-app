const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const courseSectionRead = async(_, { courseId, id }, { req }, info) => {
    regular(req)

    try {
        const result = await db.Course.findOne({ where: { courseId, id } })

        return result
    } catch (err) {
        throw err
    }
}

module.exports = {
    courseSectionRead
}