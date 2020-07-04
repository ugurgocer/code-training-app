
const express = require('express')
const route = require('./route')
const graphql = require('./graphql/apollo')
const cors = require('cors')
const loginMiddleware = require('./utils/middlewares/login.middleware')
const http = require('http')

const app = express()

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
        allowedHeaders: ["X-Token", "Content-Type"],
        credentials: true
    })
)

app.use(loginMiddleware)
app.use('/', route)
graphql(app)

const server = http.Server(app)
server.listen(5000, () => console.log('5000 portunda başlatıldı.'))