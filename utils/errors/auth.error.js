class AuthError extends Error {
    constructor(message){
        super(message);

        this.name = "AuthError"
    }
}

module.exports = AuthError