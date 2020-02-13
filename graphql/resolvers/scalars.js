const { GraphQLScalarType } = require('graphql')
const moment = require('moment')
const joi = require('@hapi/joi')

const schemaDate = joi.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/)
const schemaDateTime = joi.string().trim().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)

module.exports = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value){
            return value
        },
        serialize(value){
            return moment(value).format('YYYY-MM-DD')
        },
        parseLiteral(ast){
            const result = schemaDate.validate(ast.value)
            if(result.error)
                throw `${ast} girdisi Date tipini sağlamıyor`
            return ast.value
        }
    }),

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'DateTime tipi Yıl-Ay-Gün Saat-Dakika-Saniye formatında bir tarih dizgesi olarak tanımlanmıştır.',
        parseValue(value){
            return value
        },
        serialize(value){
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
        },
        parseLiteral(ast){
            const result = schemaDateTime.validate(ast.value)
            if(result.error)
                throw `${ast} girdisi DateTime tipini sağlamıyor`
            return ast.value
        }
    })

    
}