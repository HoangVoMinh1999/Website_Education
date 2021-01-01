var express = require('express');
var router = express.Router();
var CourseController = require('../Controller/CourseController')
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
/* GET home page. */
//--- Index
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Trang chủ' })
});
//---Login
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', layout: 'loginLayout' })
})
router.post('/login', function (req, res, next) {
  res.redirect('/')
})
//---Register
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'register', layout: 'loginLayout' })
})
router.post('/register', function (req, res, next) {
  res.redirect('/login')
})
//---Course
router.get('/course',CourseController.ListCourse)
router.get('/course-mobile', CourseController.ListCourseMobile)

router.get('/course-website', CourseController.ListCourseWebsite)
router.post('/course-website',CourseController.DeleteCourseWebsite)
//---Add Course
router.get('/add-course', function (req, res, next) {
  const connection = mysql.createConnection(connectionString);
  connection.connect();
  connection.query('SELECT * from ConfigCourseType', function (err, results, fields) {
    if (err) throw err
    console.log(results)
    res.render('./course/addCourse', { title: "Thêm khóa học mới", ConfigCourseTypes: results})
  })
  connection.end();
})
router.post('/add-course',CourseController.AddNewCourse)
//---Edit Course
router.get('/edit-course', function (req, res, next) {
  const connection = mysql.createConnection(connectionString);
  connection.connect();
  connection.query('SELECT * FROM ConfigCourse Where ID = ?',[req.query.ID],function(err,results,fields){
    console.log(results)
    res.render('./course/editCourse', { title: 'Cập nhật khóa học website',data: results[0] })
  })
  connection.end()
})
router.post('/edit-course',CourseController.EditCourse)
module.exports = router;
