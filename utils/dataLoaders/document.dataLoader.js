const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const result = await db.Document.findAll({ where: { sectionId: { [Op.in]: keys } } })

            res([result])
        }catch(err){
            rej(err)
        }
    })

})