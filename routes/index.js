var express = require('express');
var router = express.Router();
var CourseController = require('../Controller/CourseController')

/* GET home page. */
router.get('/', function(req,res,next){
  res.render('index',{title:'Trang chủ'})
});
router.get('/courses-mobile',function(req,res,next){
  res.render('courseMobile',{title:"Khóa học Mobile"})
})
router.get('/courses-website',function(req,res,next){
  res.render('courseWebsite',{title:"Khóa học Website"})
})
module.exports = router;
