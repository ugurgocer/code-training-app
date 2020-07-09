
class ImageUploadError extends Error {
    constructor(message){
        super(message);

        this.name = "ImageUploadError"
        this.message = message
        this.stack = ""
    }
}

module.exports = ImageUploadError