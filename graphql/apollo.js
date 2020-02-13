const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolver')
const depthLimit = require('graphql-depth-limit')

module.exports = async api => {
    const apollo = new ApolloServer({
        typeDefs: await importSchema('./graphql/schema.graphql'),
        validationRules: [depthLimit(6)],
        resolvers,
        introspection: true,
        context: ({ req }) => ({
            req,
            dataLoader: {}
        })
    })

    apollo.applyMiddleware({ app: api, path: '/graphql'})
}