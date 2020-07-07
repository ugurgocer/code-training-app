const db = require('./../../model/index')
const { AuthError } = require('./../errors/index')

module.exports = async ( req, res, next ) => {
    try{
        const token = req.get('X-Token') || null

        if(!token)
            next()
        else {
            const result = await db.Token.findOne({ where: { token } })

            if(!result){
                req.loginError = new AuthError('Token değeri doğru değildir.')
                next()
            }else{
                const user = await db.User.findOne({ where: { id: result.userId }})
                req.loginType = result.loginType
                req.account = user.toJSON()
                next()
            }
        }

    }catch(err){
        next()
    }
}
