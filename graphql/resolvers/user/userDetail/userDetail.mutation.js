const db = require('./../../../../model/index')
const { ValidationError } = require('./../../../../utils/errors/index')
const { parseError, loadFromDataLoader, imageUpload } = require('./../../../../utils/helpers/other')
const { regular } = require('../../../../utils/helpers/middleware')

const setUserDetail = async(_, { userId, user, userDetail }, { req, dataLoader }, info) => {
    regular(req)

    return db.sequelize.transaction(async trx => {
        try {
            userDetail.userId = userId

            let image_id = null
            if(userDetail.profilePicture){
                image_id = await imageUpload({ userId: req.account.id, ...userDetail.profilePicture}, trx)
                delete userDetail.profilePicture
                userDetail.imageId = image_id
            }

            if(user)
                await db.User.update({ ...user }, { where: { id: userId } }, {transaction: trx})

            const data = await db.UserDetail.findOne({ where: { userId } })
            let result
            if(data){
                await db.UserDetail.update({userDetail, imageId: image_id}, { where: {userId}, transaction: trx} )
                result = await db.UserDetail.findOne({ where: { userId } })
            }
            else
                result = await db.UserDetail.create({ ...userDetail, imageId: image_id }, { transaction: trx })

            return {
                userDetail: result
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
    setUserDetail
}