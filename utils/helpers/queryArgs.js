const Op = require('sequelize').Op

const fillFilter = ( filter, fields ) => {
    const output = {}

    for (const index in filter) {
        const type = Object.prototype.toString.apply(filter[index])
        if(index === 'or' || index === 'and'){
            const arr = []

            filter[index].forEach(x => {
                arr.push(fillFilter(x, fields))
            })

            output[Op[index]] = arr
        }else if (type === '[object Object]') {
            if(Object.keys(fields).indexOf(index) !== -1){
                output[index] = fillFilter(filter[index], fields)
            }else{
                output[Op[index]] = fillFilter(filter[index], fields)
            }
        }else{
            if(Object.keys(fields).indexOf(index) !== -1){
                output[index] = filter[index]
            }else{
                output[Op[index]] = filter[index]
            }
        }
    }

    return output
}

module.exports = {
    fillFilter
}