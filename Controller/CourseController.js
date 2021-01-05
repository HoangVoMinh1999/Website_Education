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
    insecureAuth: true,
    database: process.env.DB,
    schema: 'ConfigCourse'
};
//#region  List Course 
const ListCourse = function(req,res,next){
    var ConfigCourseTypeId = req.query.ConfigCourseTypeId;
    console.log(ConfigCourseTypeId);
    if (ConfigCourseTypeId === undefined){
        const connection = mysql.createConnection(connectionString);
        connection.connect();
        var query = connection.query('SELECT * from ConfigCourse where IsDeleted = ? order by ID desc',[0], function(error, results, fields) {
            if (error) throw error;
            res.render('./course/listCourse',{title:'Danh sách khóa học',data: results});
        });
        connection.end();
    }
    else {
        const connection = mysql.createConnection(connectionString);
        connection.connect()
        var title = ""
        var data = []
        connection.query('SELECT * from ConfigCourseType where Id = ? and IsDeleted = ? order by ID desc',[ConfigCourseTypeId,0],function(err,results,fields){
            if (err) throw err;
            title = results[0].Name
        })
        connection.query('SELECT * from ConfigCourse where ConfigCourseTypeId = ? and IsDeleted = ? Order by ID desc',[ConfigCourseTypeId,0],function(err,results,fields){
            if (err) throw err;
            data = results
            res.render('./course/listCourse',{title:title,data: data});
        })

        connection.end()
    }
}
//#endregion
//#region Add Course
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
        res.redirect('/course?ConfigCourseTypeId='+newItem.ConfigCourseTypeId)
      });
      connection.end();
}
//#endregion
//#region Delete Course
const DeleteCourse = function(req, res, next) {
    var Id = req.body.ID
    console.log(Id);
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    var query = connection.query('UPDATE ConfigCourse set IsDeleted = ?, Log_UpdatedDate = ? where Id = ?', [true, require('moment')().format('YYYY-MM-DD HH:mm:ss'), Id], function(err, results, fields) {
        if (err) throw err
        console.log('Delete successfully !!!')
    })
    query = connection.query('Select * from ConfigCourse where ID = ?',[Id],function(err,results,fields){
        if (err) throw err;
        var configCourseTypeId = results[0].ConfigCourseTypeId
        res.redirect('/course?ConfigCourseTypeId='+configCourseTypeId)
    })
    connection.end();
}
//#endregion
//#region Edit Course
const EditCourse = function(req, res, next) {
    var updatedItem = {
        Name: req.body.Name,
        Intro: req.body.Intro,
        Description: req.body.Description,
        Price: req.body.Price,
        Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        MaxStudents: req.body.MaxStudents,
        CurrentStudents: req.body.CurrentStudents,
        Status: req.body.Status
    }
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('UPDATE ConfigCourse set Name = ? , Intro = ? , Description = ? , Price = ?, MaxStudents = ?, CurrentStudents = ? , Log_UpdatedDate = ? , Status = ? where Id = ?', [updatedItem.Name, updatedItem.Intro, updatedItem.Description, updatedItem.Price, updatedItem.MaxStudents, updatedItem.CurrentStudents, updatedItem.Log_UpdatedDate, updatedItem.Status, req.body.ID], function(err, results, fields) {
        if (err) throw err;
        console.log('Update successfully!!!')
    })
    var query = connection.query('Select * from ConfigCourse where ID = ?',[req.body.ID],function(err,results,fields){
        if (err) throw err;
        var configCourseTypeId = results[0].ConfigCourseTypeId
        res.redirect('/course?ConfigCourseTypeId='+configCourseTypeId)
    })
    connection.end();
}
//#endregion

module.exports = {
    //--- Course
    ListCourse,
    AddNewCourse,
    DeleteCourse,
    EditCourse,
}