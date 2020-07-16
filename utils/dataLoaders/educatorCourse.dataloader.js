const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const result = await db.Course.findAll({ where: { educatorId: { [Op.in]: keys }, isPublished: true } })

            const resultArray = []

            keys.forEach(x => {
                resultArray.push(result.length ? result.filter(y => y.educatorId === x) : [])
            })

            res(resultArray)
        }catch(err){
            rej(err)
        }
    })

})