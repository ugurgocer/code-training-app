const db = require('./../../../model/index')
const { ValidationError } = require('./../../../utils/errors/index')
const { parseError } = require('./../../../utils/helpers/other')

const courseCreate = async(_, { course }, { req }, info) => {
    console.log("Course create e geldi")
    return db.sequelize.transaction(async trx => {
        try{
            const result = await db.Course.create(course, { transaction: trx })            
            return result.toJSON()
        }catch(err){
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
            }else
                throw err

            throw errors
        }
    })
}

const courseUpdate = async(_, { id, course }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            await db.Course.update({ ...course }, { where: { id }}, {transaction: trx})
            const result = await db.Course.findOne({ where: { id } })
            return result.toJSON()
        } catch (err) {
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
            }else
                throw err

            throw errors
        }
    })
}

const courseDelete = async(_, { id }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            await db.Course.destroy({ where: { _id }}, {transaction: trx})
            return {
                course_id: id
            }
        } catch (err) {
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
                else if(customErr.type === 'foreignkey')
                    throw new ValidationError(customErr.errors)
            }else
                throw err

            throw errors
        }
    })
}

module.exports = {
    courseCreate,
    courseUpdate,
    courseDelete
}