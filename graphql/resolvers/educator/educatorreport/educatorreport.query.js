const db = require('./../../../../model/index')
const { regular } = require('./../../../../utils/helpers/middleware')
const Op = require('sequelize').Op

const educatorcourseReport = async(_, { educatorId }, { req, dataLoader }, info) => {
    regular(req)
    try {
        //course detail
        let courses = await db.Course.findAll({ where: { educatorId } })
        for (const e of courses) {
            e.totalStudent = await db.CourseStudents.count({ where: { courseId: e.id } })
        }
        
        //total course
        const totalCourse = await db.Course.count({ where: { educatorId } })
        
        //total student
        let coursesId = []
        for (const e of courses)
            coursesId.push(e.id)
        const totalStudent = await db.CourseStudents.count({ where: { courseId: { [Op.in]: coursesId } } })

        return {
            courses,
            totalCourse,
            totalStudent
        }
    } catch (err) {
        throw err
    }
}
module.exports = {
    educatorcourseReport
}