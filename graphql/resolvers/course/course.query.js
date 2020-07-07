const db = require('./../../../model/index')
const { regular } = require('./../../../utils/helpers/middleware')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

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
    //regular(req)
    try {
        let results
        if(!filter)
            results = await db.Course.findAll()
        else{
            results = await db.Course.findAll({ 
                where: { 
                    name: {
                        [Op.like]: '%'+filter+'%'
                    }
                } 
            })
        }
        /*
        Post.findAll({
            where: {
                [Op.or]: [{authorId: 12}, {authorId: 13}]
            }
        });
        */
       console.log("dönecek results", results.toJSON())
        return results
    } catch (err) {
        console.log("hata\n", err)
        throw err
    }
}
module.exports = {
    courseRead,
    courseList
}