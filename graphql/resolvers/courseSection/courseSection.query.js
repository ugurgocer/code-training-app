const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const courseSectionRead = async(_, { id }, { req }, info) => {
    regular(req)

    try {
        const result = await db.CourseSection.findOne({ where: { id } })

        return result
    } catch (err) {
        throw err
    }
}

module.exports = {
    courseSectionRead
}