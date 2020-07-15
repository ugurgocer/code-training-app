const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const CourseModel = require('./course.model')
const UserModel = require('./user.model')

class CourseStudents extends Model {}

CourseStudents.init({}, {
    modelName: 'course_students',
    sequelize,
    indexes: [
        {
            unique: true,
            fields: ['courseId', 'userId']
        }
    ]
})

CourseStudents.belongsTo(UserModel, {
    onDelete: 'cascade',
    hooks: true
})

CourseStudents.belongsTo(CourseModel, {
    onDelete: 'cascade',
    hooks: true
})


module.exports = CourseStudents