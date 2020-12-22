var Sequelize = require('sequelize')

const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
const CourseModel = (sequelize, Sequelize) => {
    const Course = sequelize.define('User', {
        Id: {type: STRING},
        Name: {type: STRING,},
        ConfigCourseType: {type:STRING},
        Intro: {type:STRING},
        Description: {type:STRING},
        Rating: {type: FLOAT},
        Image : {type: STRING},
        Price: {type:FLOAT},
        IsAllowPPreview:{type:BOOLEAN}
    })
    return Course
}
module.exports = {
    CourseModel
}