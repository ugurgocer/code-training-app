
const express = require('express')
const route = require('./route')
const graphql = require('./graphql/apollo')

const app = express()
app.use('/', route)

graphql(app)

app.listen(3000, () => console.log('3000 portunda başlatıldı.'))