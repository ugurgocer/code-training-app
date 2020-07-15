const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolver')
const depthLimit = require('graphql-depth-limit')
const path = require('path')

module.exports = async api => {
    const apollo = new ApolloServer({
        typeDefs: await importSchema(path.resolve('./graphql/schema.graphql')),
        validationRules: [depthLimit(6)],
        resolvers,
        introspection: true,
        context: ({ req }) => ({
            req,
            dataLoader: {
                image: require('./../utils/dataLoaders/image.dataloader')(req.account ? req.account.id : null),
                user: require('./../utils/dataLoaders/user.dataloader')(),
                educator: require('./../utils/dataLoaders/educator.dataloader')(),
                courseSections: require('./../utils/dataLoaders/courseSections.dataLoader')(),
                documentCode: require('./../utils/dataLoaders/documentCodes.dataLoader')(),
                document: require('./../utils/dataLoaders/document.dataLoader')(),
            }
        })
    })

    apollo.applyMiddleware({ app: api, path: '/graphql'})
}