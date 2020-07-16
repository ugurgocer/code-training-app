const db = require('./../../../model/index')
const { ValidationError, UniqueError } = require('./../../../utils/errors/index')
const { parseError, imageUpload, loadFromDataLoader } = require('./../../../utils/helpers/other')
const { regular, educator: educatorMiddleware } = require('./../../../utils/helpers/middleware')

const educatorCreate = (_, { educator }, { req, dataLoader }, info) => {
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
            await db.Token.update({ loginType: "educator" }, { where: { userId: req.account.id } })

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

const educatorUpdate = async(_, { id, educator }, { req }, info) => {
    educatorMiddleware(req)

    try {

        if(educator.profilePicture){
            let image_id = await imageUpload({userId: req.account.id, ...educator.profilePicture})
            delete educator.profilePicture
            educator.profilePicture = image_id
        }

        await db.Educator.update({ ...educator }, { where: { id } })
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