const db = require('./../../../model/index')
const { ValidationError } = require('./../../../utils/errors/index')
const { parseError } = require('./../../../utils/helpers/other')

const educatorProfessionCreate = async(_, { educatorProfession }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try{
            const result = await db.EducatorProfession.create(educatorProfession, { transaction: trx })            
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

const educatorProfessionUpdate = async(_, { id, educatorProfession }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            await db.EducatorProfession.update({ ...educatorProfession }, { where: { id } } , {transaction: trx})
            const result = await db.EducatorProfession.findOne({ where: { id } })
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

const educatorProfessionDelete = async(_, { id }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            await db.EducatorProfession.destroy({ where: { id }}, {transaction: trx})
            return {
                educator_profession_id: id
            }
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

module.exports = {
    educatorProfessionCreate,
    educatorProfessionUpdate,
    educatorProfessionDelete
}