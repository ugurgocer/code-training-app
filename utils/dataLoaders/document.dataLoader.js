const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const result = await db.Document.findAll({ where: { sectionId: { [Op.in]: keys } } })
            const resultArray = []

            keys.forEach(x => {
                resultArray.push(result.length ? result.filter(y => y.sectionId === x) : [])
            })

            res(resultArray)
        }catch(err){
            rej(err)
        }
    })

})