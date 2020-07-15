const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')
const { fillFilter } = require('./../../../utils/helpers/queryArgs')

const documentRead = async(_, { id }, { req }, info) => {
    regular(req)
    try {
        const result = await db.Document.findOne({ where: { id } })

        if(!result)
            return null
            
        return result
    } catch (err) {
        throw err
    }
}

const documentList = async(_, { sectionId }, { req, dataLoader }, info) => {
    regular(req)
    try {

        const results = await db.Document.findAll({
            where: sectionId
        })
        
        return results

    } catch (err) {
        throw err
    }
}
module.exports = {
    documentRead,
    documentList
}