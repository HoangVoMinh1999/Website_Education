const router = require("../routes")
const Course = require('../Models/CourseModel')
const CourseModel = Course.CourseModel
var mysql = require('mysql')

// Config database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1104',
  database: 'tkweb'
})
connection.connect()

const ListCourseMobile = function (req, res, next) {
    connection.query('SELECT * from ConfigCourse Where ConfigCourseTypeId = 2', function (err, results, fields) {
        if (err) throw err
        console.log(results)
        res.render('./course/courseMobile',{title:"Khóa học Mobile"})
    })
}
const ListCourseWebsite = function (req, res, next) {
    connection.query('SELECT * from ConfigCourse Where ConfigCourseTypeId = 1', function (err, result, fields) {
        if (err) throw err
        console.log(result)
        res.render('./course/courseWebsite', { title: "Khóa học Website",data:result })
    })
}

const AddNewCourse = function(req,res,next){
    var newItem = {
        Name: req.body.Name,
        ConfigCourseTypeId: req.body.ConfigCourseType,
        Intro:req.body.Intro,
        Description: req.body.Description,
        Price:req.body.Price,
        Log_CreatedDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        Log_UpdatedDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }
    console.log(newItem)
    var query = connection.query('INSERT INTO ConfigCourse SET ?', newItem, function (error, results, fields) {
        if (error) throw error;
        console.log("Add Successfully !!!")
        res.redirect('/')
      });
}

module.exports = {
    ListCourseMobile,
    ListCourseWebsite,
    AddNewCourse,
}
