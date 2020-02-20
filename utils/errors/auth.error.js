class AuthError extends Error {
    constructor(message){
        super(message);

        this.name = "AuthError"
        this.message = message
        this.stack = ""
    }
}

module.exports = AuthError