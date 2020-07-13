const db = require('./../../../model/index')
const { ValidationError, UniqueError } = require('./../../../utils/errors/index')
const { parseError } = require('./../../../utils/helpers/other')
const { educator } = require('./../../../utils/helpers/middleware')

const courseSectionCreate = async (_, { courseSection, courseId }, { req }, info)=> {
    educator(req)

    try{
        const result = await db.CourseSection.create({...courseSection, courseId, educatorId: req.account.educator.id})

        return result
    }catch(err){
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

const courseSectionUpdate = async(_, { id, courseSection }, { req }, info) => {
    educator(req)

    try {
        const result = await db.CourseSection.update({ ...courseSection }, { where: { id, educatorId: req.account.educator.id }, returning: true, plain: true})

        return result[1]
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

const courseSectionDelete = async(_, { id }, { req }, info) => {
    educator(req)

    try {
        await db.CourseSection.destroy({ where: { id, educatorId: req.account.educator.id }} )

        return {
            course_section_id: id
        }
    } catch (err) {
        const customErr = parseError(err)
        if(customErr){
            if(customErr.type === 'validate')
                throw new ValidationError(customErr.errors)
        }else
            throw err
    }
}

module.exports = {
    courseSectionCreate,
    courseSectionUpdate,
    courseSectionDelete
}