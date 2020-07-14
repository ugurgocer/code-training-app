const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const CourseModel = require('./course.model')
const UserModel = require('./user.model')

class CourseStudents extends Model {}

CourseStudents.init({
    courseId: {
        type: DataTypes.INTEGER,
        field: 'course_id',
        references: {
            notEmpty: false,
            model: CourseModel,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            notEmpty: false,
            model: UserModel,
            key: 'id'
        }
    }
}, {
    modelName: 'course_students',
    sequelize,
    indexes: [
        {
            unique: true,
            fields: ['course_id', 'user_id']
        }
    ]
})

module.exports = CourseStudents