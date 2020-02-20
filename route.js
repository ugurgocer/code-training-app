const router = require('express').Router()
router.get('/', async (req, res) => {
    
    res.send("Anasayfa")
})

module.exports = router