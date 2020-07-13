const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')
const { fillFilter } = require('./../../../utils/helpers/queryArgs')

const fields = {
    title: 'title',
    educatorId: 'educatorId',
    description: 'description'
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
            results = await db.Course.findAll()
        else{
            results = await db.Course.findAll({
                where: fillFilter(filter, fields) 
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