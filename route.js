const { nodeJS } = require('./tools/spawn')
const router = require('express').Router()

router.get('/', async (req, res) => {
    nodeJS('console.log(1+2)')

    return re
})



module.exports = router