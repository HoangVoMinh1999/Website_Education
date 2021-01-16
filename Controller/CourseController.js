require('dotenv').config()
const router = require("../routes")
const CourseService = require("../Service/CourseService")


//#region  List Course 
const ListCourse =async function(req,res,next){
    if (req.session.isAdmin){
        let listData = []
        let courseType = 'Danh sách khóa học'
    
        let typeId = req.query.ConfigCourseTypeId
        if (typeId === undefined){
            listData = await  CourseService.all()
        }
        else{
            courseType = await CourseService.getCourseTypeById(typeId)
            courseType = courseType[0].Name
            listData = await CourseService.getCourseByCourseTypeId(typeId)
        }
        res.render('./course/listCourse',{
            title:courseType,
            data : listData,
        })
    }
    else if (req.session.isTeacher){
        let listData = []
        let courseType = 'Danh sách khóa học'
    
        let typeId = req.query.ConfigCourseTypeId
        if (typeId === undefined){
            listData = await  CourseService.all4UserId(req.session.authUser.ID)
        }
        else{
            courseType = await CourseService.getCourseTypeById(typeId)
            courseType = courseType[0].Name
            listData = await CourseService.getCourseByCourseTypeId4UserId(typeId,req.session.authUser.ID)
        }
        res.render('./course/listCourse',{
            title:courseType,
            data : listData,
        })
    }

}
//#endregion
//#region Add Course
const AddNewCourse =async function(req,res,next){
    console.log(req.session.authUser.ID)
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
        UserId : req.session.authUser.ID,
    }
    await CourseService.add(newItem)
    res.redirect('/course?ConfigCourseTypeId='+req.body.ConfigCourseType)
}
//#endregion
//#region Delete Course
const DeleteCourse = function(req, res, next) {
    let Id = req.query.Id
    let typeId = ''
    let course = CourseService.single(Id)
    if (course !== null){
        typeId =course.ConfigCourseTypeId
        CourseService.delete(Id)
    }
    else {
        console.log('Không tìm thấy sản phẩm')
    }
    res.redirect('/course?ConfigCourseTypeId='+typeId)
}
//#endregion
//#region Edit Course
const EditCourse = function(req, res, next) {
    let typeId = ''

    var ID = req.query.ID
    var updatedItem = {
        ID : ID,
        Name: req.body.Name,
        Intro: req.body.Intro,
        Description: req.body.Description,
        Price: req.body.Price,
        Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        MaxStudents: req.body.MaxStudents,
        CurrentStudents: req.body.CurrentStudents,
        Status: req.body.Status
    }
    let course = CourseService.single(ID)
    if (course !== null){
        CourseService.updateCourses(updatedItem.ID,updatedItem.Name,updatedItem.Intro,updatedItem.Description,updatedItem.Price,updatedItem.MaxStudents,updatedItem.CurrentStudents,updatedItem.Log_UpdatedDate,updatedItem.Status)
        typeId = course.ConfigCourseTypeId
    }
    res.redirect('/course?ConfigCourseTypeId='+typeId)
}
//#endregion

module.exports = {
    //--- Course
    ListCourse,
    AddNewCourse,
    DeleteCourse,
    EditCourse,
}