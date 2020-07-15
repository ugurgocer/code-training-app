const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')
const { fillFilter } = require('./../../../utils/helpers/queryArgs')

const fields = {
    title: 'title',
    educatorId: 'educatorId',
    description: 'description',
    isPublished: 'isPublished'
}

const courseRead = async(_, { seoLink }, { req }, info) => {
    regular(req)
    try {
        const result = await db.Course.findOne({ where: { seoLink } })

        if(!result)
            return null
            
        return {
            ...result.toJSON()
        }
    } catch (err) {
        throw err
    }
}

const courseList = async(_, { filter, sorting, paging }, { req, dataLoader }, info) => {
    regular(req)
    try {
        let results = []
        
        if(!filter)
            results = await db.Course.findAll({ 
                order: [ [sorting ? sorting.field : 'createdAt', sorting ? sorting.type : 'DESC']],
                limit: paging ? paging.limit : 50, offset: paging ? paging.offset : 0
            })
        else{
            results = await db.Course.findAll({
                where: fillFilter(filter, fields),
                order: [ [sorting ? sorting.field : 'createdAt', sorting ? sorting.type : 'DESC'] ],
                limit: paging ? paging.limit : 50, offset: paging ? paging.offset : 0
            })
        }

        return {
            courses: results
        }
    } catch (err) {
        throw err
    }
}
module.exports = {
    courseRead,
    courseList
}