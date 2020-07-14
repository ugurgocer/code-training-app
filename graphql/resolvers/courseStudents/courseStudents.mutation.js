const db = require('./../../../model/index')
const { ValidationError, UniqueError } = require('./../../../utils/errors/index')
const { parseError } = require('./../../../utils/helpers/other')
const { educator } = require('./../../../utils/helpers/middleware')

const courseStudentCreate = async(_, { courseId }, { req }, info) => {
    try {
        const result = await db.CourseStudents.create({ courseId, userId: req.account.id })
        return result
    } catch (err) {
        const customErr = parseError(err)
        if(customErr){
            if(customErr.type === 'validate')
                throw new ValidationError(customErr.errors)
            else if(customErr.type === 'unique')
                throw new UniqueError({ ...customErr.error, value: courseSection[customErr.error.field]})
        }else
            throw err
    }
}

module.exports = {
    courseStudentCreate
}