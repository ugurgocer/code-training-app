const db = require('./../../../model/index')
const { ValidationError, UniqueError } = require('./../../../utils/errors/index')
const { parseError, loadFromDataLoader, imageUpload } = require('./../../../utils/helpers/other')
const { educator } = require('./../../../utils/helpers/middleware')

const courseCreate = async (_, { course }, { req, dataLoader }, info)=> {
    educator(req)

    return db.sequelize.transaction(async trx => {
        try{
            let image_id = null
            if(course.image){
                image_id = await imageUpload({ userId: req.account.id, ...course.image}, trx)
                delete course.image
            }
            
            const result = await db.Course.create({...course, imageId: image_id, educatorId: req.account.educator.id}, { transaction: trx })

            return {
                ...result.toJSON(),
                courseId: result.id
            }
        }catch(err){
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
                else if(customErr.type === 'unique')
                    throw new UniqueError({ ...customErr.error, value: course[customErr.error.field]})
            }else
                throw err
        }
    })
}

const courseUpdate = async(_, { id, course }, { req }, info) => {
    educator(req)

    try {
        const result = await db.Course.update(course, { where: { id, educatorId: req.account.educator.id }, returning: true, plain: true})

        return result[1]
    } catch (err) {
        const customErr = parseError(err)
        if(customErr){
            if(customErr.type === 'validate')
                throw new ValidationError(customErr.errors)
        }else
            throw err
    }
}

const courseDelete = async(_, { id }, { req }, info) => {
    educator(req)

    try {
        await db.Course.destroy({ where: { id, educatorId: req.account.educator.id }})

        return {
            course_id: id
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
    courseCreate,
    courseUpdate,
    courseDelete
}