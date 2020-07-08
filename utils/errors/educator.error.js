
class EducatorError extends Error {
    constructor(message){
        super(message);

        this.name = "EducatorError"
        this.message = message
        this.stack = ""
    }
}

module.exports = EducatorError