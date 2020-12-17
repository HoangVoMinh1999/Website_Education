var express = require('express');
var router = express.Router();
var CourseController = require('../Controller/CourseController')

/* GET home page. */
router.get('/', function(req,res,next){
  res.render('index',{title:'Trang chủ'})
});
module.exports = router;
