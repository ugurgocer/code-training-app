
const express = require('express')
const graphql = require('./graphql/apollo')
const cors = require('cors')
const loginMiddleware = require('./utils/middlewares/login.middleware')
const http = require('http')
const codeRun = require('./tools/spawn')
const { regular } = require('./utils/helpers/middleware')

const app = express()

app.use(express.json({limit: '50mb'}))
app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
        allowedHeaders: ["X-Token", "Content-Type"],
        credentials: true
    })
)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/htmls')
app.engine('html', require('ejs').renderFile)

app.use(loginMiddleware)

app.post('/run/code', async (req, res) => {
    regular(req)
    try{
        const codes = {
            'JAVASCRIPT': 'nodeJS',
            'PYTHON': 'python',
        }
        let result = ""
        if(codes[req.body.language]){
            result = await codeRun[codes[req.body.language]](req.body.value)
        }
        
        res.json({ success: true, result })
    }catch(err){
        res.json({ success: false, result: err })
    }
})

graphql(app)

const server = http.Server(app)
server.listen(5000, () => console.log('5000 portunda başlatıldı.'))