const router = require("../routes")
const Course = require('../Models/CourseModel')
const CourseModel = Course.CourseModel
var mysql = require('mysql')

// Config database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1104',
  database: 'website'
})

const ListCourse = function (req, res, next) {
    connection.connect()
    connection.query('SELECT * from ConfigCourse', function (err, results, fields) {
        if (err) throw err

        console.log(results)
    })
    connection.end()
    res.render('./course/courseMobile',{title:"Khóa học Mobile"})
}

const AddNewCourse = function(req,res,next){
    var newItem = {
        Name: req.body.Name,
        Intro:req.body.Intro,
        Description: req.body.Description,
        Rating:req.body.Rating,
        Price:req.body.Price,
        
    }
    connection.connect()
}

module.exports = {
    ListCourse
}