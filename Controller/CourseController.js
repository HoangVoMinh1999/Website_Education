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
    connection.query('SELECT * from course', function (err, results, fields) {
        if (err) throw err

        console.log(results)
    })
    connection.end()
}

module.exports = {
    ListCourse
}