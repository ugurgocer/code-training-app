const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = user_id => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const [tag, created] = await db.ImageStorage.findAll({ where: { userId: user_id, id: keys[0] } })

            res([tag.get({ plain: 'text' })])
        }catch(err){
            console.log(err)
            rej(err)
        }
    })

})