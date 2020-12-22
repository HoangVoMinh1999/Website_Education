var express = require('express');
var router = express.Router();
var CourseController = require('../Controller/CourseController')
var mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1104',
  database: 'tkweb'
})

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
router.get('/course-mobile', CourseController.ListCourseMobile)

router.get('/course-website', CourseController.ListCourseWebsite)
//---Add Course
router.get('/add-course', function (req, res, next) {
  connection.connect()
  connection.query('SELECT * from ConfigCourseType', function (err, results, fields) {
    if (err) throw err
    console.log(results)
    res.render('./course/addCourse', { title: "Thêm khóa học mới", ConfigCourseTypes: results})
  })
  connection.end()
})
router.post('/add-course',CourseController.AddNewCourse)
//---Edit Course
router.get('/course-website/edit-course', function (req, res, next) {
  res.render('./course/editCourse', { title: 'Cập nhật khóa học website' })
})
router.get('/course-mobile/edit-course', function (req, res, next) {
  res.render('./course/editCourse', { title: 'Cập nhật khóa học mobile' })
})
module.exports = router;
