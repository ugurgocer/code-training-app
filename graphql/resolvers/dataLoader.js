module.exports = {
    Course: {
        image: (result, _, { dataLoader }) => dataLoader.image.load(result.imageId),
        educator: (result, _, { dataLoader }) => dataLoader.educator.load(result.educatorId),
        courseSections: (result, _, { dataLoader }) => dataLoader.courseSections.load(result.id)
    },
    Educator: {
        profilePicture: (result, _, { dataLoader }) => dataLoader.image.load(result.profilePicture),
    },
    Token: {
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId),
    },
    Document: {
        codes: (result, _, { dataLoader }) => dataLoader.documentCode.load(result.id)
    },
    
    CourseSection: {
        documents: (result, _, { dataLoader }) => dataLoader.document.load(result.id)
    }
}