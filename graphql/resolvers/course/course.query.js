const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')
const { fillFilter } = require('./../../../utils/helpers/queryArgs')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const fields = {
    name: 'name'
}

const courseRead = async(_, { _id }, { req }, info) => {
    regular(req)
    try {
        const result = await db.Course.findOne({ where: { _id } })
        return result
    } catch (err) {
        throw err
    }
}

const courseList = async(_, { filter, sorting, paging }, { req }, info) => {
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