require('dotenv').config()
const router = require("../routes")
const Course = require('../Models/CourseModel')
const CourseModel = Course.CourseModel
var mysql = require('mysql')

// Config database
const connectionString = {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    insecureAuth : true,
    database: process.env.DB,
    schema:'ConfigCourse'
};

//--- Course
const AddNewCourse = function(req,res,next){
    var newItem = {
        Name: req.body.Name,
        ConfigCourseTypeId: req.body.ConfigCourseType,
        Intro:req.body.Intro,
        Description: req.body.Description,
        Price:req.body.Price == '' ? 0 : req.body.Price,
        Log_CreatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
    }
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    var query = connection.query('INSERT INTO ConfigCourse SET ?', newItem, function (error, results, fields) {
        if (error) throw error;
        console.log("Add Successfully !!!")
        res.redirect('back')
      });
      connection.end();
}

//--- Course Mobile
const ListCourseMobile = function (req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('SELECT * from ConfigCourse Where ConfigCourseTypeId = 2 and IsDeleted = 0 Order by ID desc', function (err, result, fields) {
        if (err) throw err
        res.render('./course/courseWebsite', { title: "Khóa học Mobile",data:result })
    })
    connection.end();
}
const DeleteCourseMobile = function(req,res,next){
    var Id = req.body.ID
    console.log(Id);
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    var query = connection.query('UPDATE ConfigCourse set IsDeleted = ?, Log_UpdatedDate = ? where Id = ?',[true,require('moment')().format('YYYY-MM-DD HH:mm:ss'),Id],function(err,results,fields){
        if (err) throw err
        console.log('Delete successfully !!!')
        res.redirect('/course-mobile')
    })
    connection.end();
}

//--- Course Website
const ListCourseWebsite = function (req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('SELECT * from ConfigCourse Where ConfigCourseTypeId = 1 and IsDeleted = 0 order by ID desc', function (err, result, fields) {
        if (err) throw err
        res.render('./course/courseWebsite', { title: "Khóa học Website",data:result })
    })
    connection.end();
}
const DeleteCourseWebsite = function(req,res,next){
    var Id = req.body.ID
    console.log(Id);
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    var query = connection.query('UPDATE ConfigCourse set IsDeleted = ?, Log_UpdatedDate = ? where Id = ?',[true,require('moment')().format('YYYY-MM-DD HH:mm:ss'),Id],function(err,results,fields){
        if (err) throw err
        console.log('Delete successfully !!!')
        res.redirect('/course-website')
    })
    connection.end();
}




module.exports = {
    //--- Course
    AddNewCourse,
    //--- Mobile
    ListCourseMobile,
    //--- Website
    ListCourseWebsite,
    DeleteCourseWebsite,
}
