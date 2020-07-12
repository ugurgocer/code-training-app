module.exports = {
    Course: {
        image: (result, _, { dataLoader }) => dataLoader.image.load(result.imageId),
        educator: (result, _, { dataLoader }) => dataLoader.educator.load(result.educatorId),
    },
    Educator: {
        profilePicture: (result, _, { dataLoader }) => dataLoader.image.load(result.profilePicture),
    },
    Token: {
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId),
    }
}