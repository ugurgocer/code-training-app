const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const result = await db.Code.findAll({ where: { documentId: { [Op.in]: keys } } })
            const resultArray = []

            keys.forEach(x => {
                resultArray.push(result.length ? result.filter(y => y.documentId === x) : [])
            })

            res(resultArray)
        }catch(err){
            rej(err)
        }
    })

})