var express = require('express');
var router = express.Router();
var CourseController = require('../Controller/CourseController')

/* GET home page. */
//--- Index
router.get('/', function(req,res,next){
  res.render('index',{title:'Trang chủ'})
});
//---Login
router.get('/login',function(req,res,next){
  res.render('login',{title:'Login',layout:'loginLayout'})
})
router.post('/login',function(req,res,next){
  res.redirect('/')
})
//---Register
router.get('/register',function(req,res,next){
  res.render('register',{title:'register',layout:'loginLayout'})
})
router.post('/register',function(req,res,next){
  res.redirect('/login')
})
//---Course
router.get('/courses-mobile',function(req,res,next){
  res.render('./course/courseMobile',{title:"Khóa học Mobile"})
})
router.get('/courses-website',function(req,res,next){
  res.render('./course/courseWebsite',{title:"Khóa học Website"})
})
//---Add Course
router.get('/add-course',function(req,res,next){
  res.render('./course/addCourse',{title:'Add new course'})
})
//---Edit Course
router.get('/edit-course',function(req,res,next){
  res.render('./course/editCourse',{title:'Edit course'})
})
module.exports = router;
