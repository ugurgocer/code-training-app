const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const result = await db.User.findAll({ where: { id: { [Op.in]: keys } } })

            res([result])
        }catch(err){
            rej(err)
        }
    })

})