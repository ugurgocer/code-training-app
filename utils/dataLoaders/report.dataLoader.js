

const db = require('./../../model/index')
const Op = require('sequelize').Op
const DataLoader = require('dataloader')

module.exports = () => new DataLoader(keys => {
    return new Promise(async (res, rej) => {
        try{
            const totalCourse = await db.Course.count({ where: { educatorId: { [Op.in]: keys }, isPublished: true} })

            //total document
            const totalDocument = await db.Document.count({ where: { educatorId: { [Op.in]: keys }} })
            
            res([{
                totalCourse,
                totalDocument
            }])
        }catch(err){
            rej(err)
        }
    })

})