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
    }
}, {
    modelName: 'course_sections',
    sequelize,
    indexes: [
        {
            unique: true,
            fields: ['title', 'courseId']
        }
    ]
})

CourseSection.belongsTo(EducatorModel, {
    onDelete: 'cascade',
    hooks: true
})

CourseSection.belongsTo(CourseModel, {
    onDelete: 'cascade',
    hooks: true
})

module.exports = CourseSection