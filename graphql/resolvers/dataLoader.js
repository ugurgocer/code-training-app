module.exports = {
    Course: {
        image: (result, _, { dataLoader }) => dataLoader.image.load(result.imageId),
        educator: (result, _, { dataLoader }) => dataLoader.educator.load(result.educatorId),
        courseSections: (result, _, { dataLoader }) => dataLoader.courseSections.load(result.id)
    },
    CourseStudent: {
        course: (result, _, { dataLoader }) => dataLoader.course.load(result.courseId),
        users: (result, _, { dataLoader }) => dataLoader.users.load(result.userId)
    },
    StudentCourse: {
        courses: (result, _, { dataLoader }) => dataLoader.courses.load(result.courseId),
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId)
    },
    UserDetail: {
        profilePicture: (result, _, { dataLoader }) => dataLoader.image.load(result.imageId),
        user: (result, _, { dataLoader }) => dataLoader.user.load(result.userId)
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