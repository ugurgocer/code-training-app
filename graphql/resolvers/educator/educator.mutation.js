const db = require('./../../../model/index')
const { ValidationError } = require('./../../../utils/errors/index')
const { parseError } = require('./../../../utils/helpers/other')

const educatorCreate = (_, { educator }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try{
            const result = await db.Educator.create(educator, { transaction: trx })      
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

const educatorUpdate = async(_, { id, educator }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            await db.Educator.update({ ...educator }, { where: { id } } , { transaction: trx } )
            const result = await db.Educator.findOne({ where: { id } })
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

const educatorDelete = async(_, { id }, { req }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            await db.Educator.destroy({ where: { id }}, {transaction: trx} )
            return {
                educator_id: id
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
    educatorCreate,
    educatorUpdate,
    educatorDelete
}