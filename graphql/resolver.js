const scalars = require('./resolvers/scalars')
const enums = require('./resolvers/enums')
const auth = require('./resolvers/auth/auth.index')
const userDetail = require('./resolvers/user/userDetail/userDetail.index')
const educator = require('./resolvers/educator/educator.index')
const educatorreport = require('./resolvers/educator/educatorreport/educatorreport.index')
const educatorProfession = require('./resolvers/educatorprofession/educatorprofession.index')
const course = require('./resolvers/course/course.index')
const courseSection = require('./resolvers/courseSection/courseSection.index')
const document = require('./resolvers/document/document.index')
const dataloader = require('./resolvers/dataLoader')

module.exports = {
    ...dataloader,
    Query: {
        ...userDetail.Query,
        ...educator.Query,
        ...educatorreport.Query,
        ...educatorProfession.Query,
        ...auth.Query,
        ...course.Query,
        ...courseSection.Query,
        ...document.Query
    },
    Mutation: {
        ...userDetail.Mutation,
        ...educator.Mutation,
        ...educator.Mutation,
        ...educatorProfession.Mutation,
        ...auth.Mutation,
        ...course.Mutation,
        ...courseSection.Mutation,
        ...document.Mutation
    },
    ...scalars,
    ...enums
}