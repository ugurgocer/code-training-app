module.exports = {
    Course: {
        image: (result, _, { dataLoader }) => dataLoader.image.load(result.imageId),
        educator: (result, _, { dataLoader }) => dataLoader.educator.load(result.educatorId),
        courseSections: (result, _, { dataLoader }) => dataLoader.courseSections.load(result.id)
    },
    UserDetail: {
        image: (result, _, { dataLoader }) => dataLoader.image.load(result.imageId),
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId)
    },
    Educator: {
        profilePicture: (result, _, { dataLoader }) => dataLoader.image.load(result.profilePicture),
    },
    Token: {
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId),
    }
}