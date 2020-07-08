const scalars = require('./resolvers/scalars')
const enums = require('./resolvers/enums')
const auth = require('./resolvers/auth/auth.index')
const educator = require('./resolvers/educator/educator.index')
const educatorProfession = require('./resolvers/educatorprofession/educatorprofession.index')
const course = require('./resolvers/course/course.index')

module.exports = {
    Query: {
        ...educator.Query,
        ...educatorProfession.Query,
        ...auth.Query,
        ...course.Query
    },
    Mutation: {
        ...educator.Mutation,
        ...educatorProfession.Mutation,
        ...auth.Mutation,
        ...course.Mutation
    },
    ...scalars,
    ...enums
}