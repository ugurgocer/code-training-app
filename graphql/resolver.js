const scalars = require('./resolvers/scalars')
const enums = require('./resolvers/enums')
const auth = require('./resolvers/auth/auth.index')

module.exports = {
    ...scalars,
    ...auth,
    ...enums
}