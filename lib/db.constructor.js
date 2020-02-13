'use strict'

const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config')

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
)

sequelize.sync({ logging: false })

module.exports = sequelize