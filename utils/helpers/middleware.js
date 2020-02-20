const { AuthError } = require('./../errors/index')

const regular = req => {
    if(!req.loginType)
        throw req.loginError ? req.loginError : new AuthError("Giriş yapmanız gerekiyor.") 
}

const educator = req => {
    if(!req.loginType || req.loginType !== 'educator')
       throw req.loginError ? req.loginError : new AuthError("Eğitmen girişi yapmanız gerekiyor.")
}

module.exports = {
    regular,
    educator
}