module.exports = {
    Course: {
        image: (result, _, { dataLoader }) => result.imageId ? dataLoader.image.load(result.imageId) : null,
        educator: (result, _, { dataLoader }) => dataLoader.educator.load(result.educatorId),
        courseSections: (result, _, { dataLoader }) => dataLoader.courseSections.load(result.id)
    },
    UserDetail: {
        profilePicture: (result, _, { dataLoader }) => result.imageId ? dataLoader.image.load(result.imageId) : null,
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId)
    },
    Educator: {
        profilePicture: (result, _, { dataLoader }) => result.profilePicture ? dataLoader.image.load(result.profilePicture) : null,
        courses: (result, _, { dataLoader }) => dataLoader.educatorCourse.load(result.id),
        report: (result, _, { dataLoader }) => dataLoader.report.load(result.id),
    },
    Token: {
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId),
    },
    Document: {
        codes: (result, _, { dataLoader }) => dataLoader.documentCode.load(result.id),
        documentUser: (result, _, { dataLoader }) => dataLoader.userDocument.load(result.id)
    },
    CourseSection: {
        documents: (result, _, { dataLoader }) => dataLoader.document.load(result.id)
    }
}