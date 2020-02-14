
const express = require('express')
const route = require('./route')
const graphql = require('./graphql/apollo')
const cors = require('cors')

const app = express()

app.use('/', route)
app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
        allowedHeaders: ["X-Token", "Content-Type"],
        credentials: true
    })
)

graphql(app)

app.listen(3000, () => console.log('3000 portunda başlatıldı.'))