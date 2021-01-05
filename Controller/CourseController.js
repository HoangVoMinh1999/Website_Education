require('dotenv').config()
const router = require("../routes")
const Course = require('../Models/CourseModel')
const CourseModel = Course.CourseModel
var mysql = require('mysql')

// Config database
const connectionString = {
    host: process.env.HOST,
    user: process.env.USERID,
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
        MaxStudents : req.body.MaxStudents,
        CurrentStudents : 0,
        Rating : 0.0,
        Status : req.body.Status,
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
//--- List Course 
const ListCourse = function(req,res,next){
    var ConfigCourseTypeId = req.query.ConfigCourseTypeId;
    console.log(ConfigCourseTypeId);
    if (ConfigCourseTypeId === null){
        const connection = mysql.createConnection(connectionString);
        connection.connect()
        connection.query('SELECT * from ConfigCourse',function(err,results,fields){
            if (err) throw err;
            console.log(results)
            res.render('./course/courseWebsite',{title:'Tất cả khóa học',data: results});
        })
        connection.end();
    }
    else {
        const connection = mysql.createConnection(connectionString);
        connection.connect()
        connection.query('SELECT * from ConfigCourse where ConfigCourseTypeId = ? and IsDeleted = ? Order by ID desc',[ConfigCourseTypeId,0],function(err,results,fields){
            if (err) throw err;
            console.log(results)
            res.render('./course/courseWebsite',{title:'Tất cả khóa học',data: results});
        })
        connection.end()
    }
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
        console.log(result)
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

const EditCourse = function(req,res,next){
    var updatedItem = {
        Name : req.body.Name,
        Intro : req.body.Intro,
        Description:req.body.Description,
        Price:req.body.Price,
        Log_UpdatedDate : require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        MaxStudents : req.body.MaxStudents,
        CurrentStudents : req.body.CurrentStudents,
        Status:req.body.Status
    }
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('UPDATE ConfigCourse set Name = ? , Intro = ? , Description = ? , Price = ?, MaxStudents = ?, CurrentStudents = ? , Log_UpdatedDate = ? , Status = ? where Id = ?',[updatedItem.Name,updatedItem.Intro,updatedItem.Description,updatedItem.Price,updatedItem.MaxStudents,updatedItem.CurrentStudents,updatedItem.Log_UpdatedDate,updatedItem.Status,req.body.ID],function(err,results,fields){
        if (err) throw err;
        res.redirect('/course-website')
    })
    connection.end();
}

const ListUser = function(req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect;
    connection.query('SELECT * ')
}


module.exports = {
    //--- Course
    ListCourse,
    AddNewCourse,
    //--- Mobile
    ListCourseMobile,
    //--- Website
    ListCourseWebsite,
    DeleteCourseWebsite,
    //EditCourse
    EditCourse,
}
