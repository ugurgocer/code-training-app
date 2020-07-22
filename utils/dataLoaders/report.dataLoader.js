

const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    console.log(keys)
    return new Promise(async (res, rej) => {
        try{
            let result = []

            for (var i in keys){
                result.push({
                    totalCourse: await db.Course.count({ where: { educatorId: keys[i], isPublished: true} }),
                    totalDocument: await db.Document.count({ where: { educatorId: keys[i]} })
                })
            }
            
            res(result)
        }catch(err){
            rej(err)
        }
    })

})