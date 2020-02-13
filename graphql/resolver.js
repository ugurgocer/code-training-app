const scalars = require('./resolvers/scalars')
const auth = require('./resolvers/auth/auth.index')

module.exports = {
    ...scalars,
    ...auth
}