const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/db.constructor')
const EducatorModel = require('./educator.model')
const CourseModel = require('./course.model')

class CourseSection extends Model {}

CourseSection.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: ['0', '1000']
        }
    },
    educatorId: {
        type: DataTypes.INTEGER,
        field: 'educator_id',
        references: {
            notEmpty: false,
            model: EducatorModel,
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        field: 'course_id',
        references: {
            model: CourseModel,
            key: 'id'
        }
    }
}, {
    modelName: 'course_sections',
    sequelize,
    indexes: [
        {
            unique: true,
            fields: ['title', 'course_id']
        }
    ]
})

module.exports = CourseSection