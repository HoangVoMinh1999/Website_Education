var express = require('express');
var router = express.Router();
var CourseController = require('../Controller/CourseController')
var UserController = require('../Controller/UserController')
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
/* GET home page. */
//--- Index
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Trang chủ' })
});
//---Login
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', layout: 'loginLayout' })
})
router.post('/login', function(req, res, next) {
        res.redirect('/')
    })
    //---Register
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'register', layout: 'loginLayout' })
})
router.post('/register', function(req, res, next) {
        res.redirect('/login')
    })
    //---Course
router.get('/course', CourseController.ListCourse)
router.post('/course', CourseController.DeleteCourse)
    //---Add Course
router.get('/add-course', function(req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('SELECT * from ConfigCourseType', function(err, results, fields) {
        if (err) throw err
        console.log(results)
        res.render('./course/addCourse', { title: "Thêm khóa học mới", ConfigCourseTypes: results })
    })
    connection.end();
})
router.post('/add-course', CourseController.AddNewCourse)
    //---Edit Course
router.get('/edit-course', function(req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('SELECT * FROM ConfigCourse Where ID = ?', [req.query.ID], function(err, results, fields) {
        console.log(results)
        res.render('./course/editCourse', { title: 'Cập nhật khóa học website', data: results[0] })
    })
    connection.end()
})
router.post('/edit-course', CourseController.EditCourse)





///--- User
router.get('/user', UserController.ListUser)

//#region Add User
router.get('/add-user', function(req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query('SELECT * from USERTYPE', function(err, results, fields) {
        if (err) throw err
        res.render('./account/addUser', { title: "Thêm người dùng mới", data: results })
    })
    connection.end();
})

router.post('/add-user', UserController.AddNewUser)
    //#endregion

//#region Delete User
router.post('/user', UserController.DeleteUser)
    //#endregion

//#region Edit User
router.get('/edit-user', function(req, res, next) {
    const connection = mysql.createConnection(connectionString);
    connection.connect();
    var data = '';
    var currentRole = '';
    var listRole = [];
    connection.query('SELECT * FROM USER WHERE ID = ?', [req.query.ID], function(err, results, fields) {
        if (err) throw err;
        console.log(results);
        if (results !== undefined) {
            data = results[0];
            const connection1 = mysql.createConnection(connectionString);
            connection1.connect()
            connection1.query('SELECT * FROM USERTYPE WHERE ID = ?', [data.Role], function(err, results, fields) {
                if (err) throw err;
                currentRole = results[0];
            })
            connection1.query('SELECT * FROM USERTYPE', function(err, results, fields) {
                if (err) throw err;
                listRole = results;
                res.render('./account/editUser', { title: 'Cập nhật thông tin người dùng', data: data, CurrentRole: currentRole, ListRole: listRole })
            })
            console.log(currentRole, listRole)
            connection1.end();
        }
    })
    connection.end()
})
router.post('/edit-user', UserController.EditUser)

//#endregion
module.exports = router;