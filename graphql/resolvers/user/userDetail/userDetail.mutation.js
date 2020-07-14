const db = require('./../../../../model/index')
const { ValidationError } = require('./../../../../utils/errors/index')
const { parseError, loadFromDataLoader, imageUpload } = require('./../../../../utils/helpers/other')

const setUserDetail = async(_, { user_id, user, userDetail }, { req, dataLoader }, info) => {
    return db.sequelize.transaction(async trx => {
        try {
            let image_id = null
            if(userDetail.profilePicture){
                image_id = await imageUpload({ userId: req.account.id, ...userDetail.profilePicture}, trx)
                delete userDetail.profilePicture
            }

            if(user)
                await db.User.update({ ...user }, { where: { id: user_id } }, {transaction: trx})

            const data = await db.UserDetail.findOne({ where: { user_id } })
            if(data)
                db.UserDetail.update({ ...userDetail, imageId: image_id, }, { where: { user_id } }, {transaction: trx} )
            else
                db.UserDetail.create({ ...userDetail, imageId: image_id}, { transaction: trx })

            const result = await db.UserDetail.findOne({ where: { user_id } })
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

module.exports = {
    setUserDetail
}