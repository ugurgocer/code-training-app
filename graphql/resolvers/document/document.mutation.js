const db = require('./../../../model/index')
const { ValidationError, UniqueError } = require('./../../../utils/errors/index')
const { parseError, loadFromDataLoader, imageUpload } = require('./../../../utils/helpers/other')
const { educator } = require('./../../../utils/helpers/middleware')

const documentCreate = async (_, { document, sectionId }, { req, dataLoader }, info)=> {
    educator(req)

    return db.sequelize.transaction(async trx => {
        try{
            let codes = null
            if(document.codes){
                codes = document.codes

                delete document.codes
            }
            const result = await db.Document.create({...document, educatorId: req.account.educator.id, sectionId }, { transaction: trx })

            if(codes){
               await db.Code.bulkCreate(codes.map(code => ({ userId: req.account.id, ...code, educatorId: req.account.educator.id, documentId: result.id })), { transaction: trx })
            }

            return result
        }catch(err){
            const customErr = parseError(err)
            if(customErr){
                if(customErr.type === 'validate')
                    throw new ValidationError(customErr.errors)
            }else
                throw err
        }
    })
}

const documentUpdate = async (_, { id, documentObj }, { req }, info) => {
    educator(req)

    try{
        let codes = null
        if(documentObj.codes){
            codes = documentObj.codes

            delete documentObj.codes
        }

        const result = await db.Document.update(documentObj, { where: { id }, returning: true, plain: true })

        if(codes){
            await db.Code.destroy({ where: { documentId: id }  })
            await db.Code.bulkCreate(codes.map(code => ({ userId: req.account.id, ...code, educatorId: req.account.educator.id, documentId: id })))
        }

        return result[0]
    }catch(err){
        const customErr = parseError(err)
        if(customErr){
            if(customErr.type === 'validate')
                throw new ValidationError(customErr.errors)
        }else
            throw err
    }
}

const documentDelete = async(_, { id }, { req }, info) => {
    educator(req)

    try {
        await db.Document.destroy({ where: { id, educatorId: req.account.educator.id }})

        return {
            document_id: id
        }
    } catch (err) {
        const customErr = parseError(err)
        if(customErr){
            if(customErr.type === 'validate')
                throw new ValidationError(customErr.errors)
        }else
            throw err
    }
}

module.exports = {
    documentCreate,
    documentUpdate,
    documentDelete
}