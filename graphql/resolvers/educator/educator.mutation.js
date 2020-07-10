const db = require('./../../../model/index')
const { ValidationError, UniqueError } = require('./../../../utils/errors/index')
const { parseError, imageUpload, loadFromDataLoader } = require('./../../../utils/helpers/other')
const { regular, educator } = require('./../../../utils/helpers/middleware')

const educatorCreateBefore = (educator, req) => {
    regular(req)

    return db.sequelize.transaction(async trx => {
        try{
            let image_id = null
            if(educator.profilePicture){
                image_id = await imageUpload({userId: req.account.id, ...educator.profilePicture}, trx)
                delete educator.profilePicture
            }
            
            const result = await db.Educator.create({ ...educator, profilePicture: image_id, userId: req.account.id }, { transaction: trx })

            await db.User.update({ isEducator: true }, { where: { id: req.account.id } })

            return {
                ...result.toJSON(),
                educatorId: result.id
            }
        }catch(err){
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
                else if(customErr.type === 'unique')
                    throw new UniqueError({ ...customErr.error, value: educator[customErr.error.field]})
            }else
                throw err
        }
    })
}

const educatorCreate = async (_, { educator }, { req, dataLoader }, info) => {
    try{
        const result = await educatorCreateBefore(educator, req)
    
        const profilePicture = await loadFromDataLoader(dataLoader.image, result.profilePicture)

        return {
            ...result,
            profilePicture
        }
    }catch(err){
        throw err
    }


}

const educatorUpdate = async(_, { id, educator }, { req }, info) => {
    educator(req)

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
    educator(req)
    
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