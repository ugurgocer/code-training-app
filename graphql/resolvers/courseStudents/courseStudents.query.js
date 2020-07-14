const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')

const courseStudentList = async(_, { courseId }, { req, dataLoader }, info) => {
    regular(req)
    try {
        const results = await db.CourseStudents.findAll({ where: { courseId } })

        return {
            course_students: results
        }
    } catch (err) {
        throw err
    }
}

const studentCourseList = async(_, { }, { req, dataLoader }, info) => {
    regular(req)
    try {
        const results = await db.CourseStudents.findAll({ where: { userId: req.account.id } })

        return {
            student_courses: results
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    courseStudentList,
    studentCourseList
}