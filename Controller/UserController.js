require('dotenv').config()

const router = require("../routes")
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
var session = require('express-session');
// --- Config database ---
const connectionString = {
    host: process.env.HOST,
    user: process.env.USERID,
    password: process.env.PASSWORD,
    insecureAuth: true,
    database: process.env.DB,
    // schema: 'user'
};

//#region List User
const ListUser = function(req, res, next) {
        var userType = req.query.UserType
        console.log(userType)
        if (userType === undefined) {
            const connection = mysql.createConnection(connectionString)
            var title = ""
            connection.connect()
            connection.query('SELECT * FROM USER WHERE  IsDeleted = ? ORDER BY ID DESC', [0], function(err, results, fields) {
                if (err) throw err
                console.log(results)
                res.render('./account/listUser', { title: 'Danh sách người dùng ', data: results })
            })
            connection.end()
        } else {
            const connection = mysql.createConnection(connectionString)
            var title = ""
            connection.connect()
            connection.query('SELECT * FROM USERTYPE WHERE ID = ?', [userType], function(err, results, fields) {
                if (err) throw err
                title = results[0].Role
            })
            connection.query('SELECT * FROM USER WHERE ROLE = ? AND IsDeleted = ? ORDER BY ID DESC', [userType, 0], function(err, results, fields) {
                if (err) throw err
                console.log(results)
                res.render('./account/listUser', { title: 'Danh sách người dùng ' + title, data: results })
            })
            connection.end()
        }

    }
    //#endregion

//#region Add User
const AddNewUser = function(req, res, next) {
        var newItem = {
            Username: req.body.Username,
            Password: bcrypt.hashSync(req.body.Password, 10),
            Email: req.body.Email,
            Role: req.body.Role,
            Status: req.body.Status,
            Log_CreatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        }
        console.log(newItem)
        if (req.body.Password === req.body.ConfirmPassword) {
            const connection = mysql.createConnection(connectionString);
            connection.connect();
            var query = connection.query('INSERT INTO USER SET ? ', [newItem], function(error, results, fields) {
                if (error) throw error;
                console.log(newItem)
                console.log("Add Successfully !!!")
                res.redirect('/user?UserType=' + newItem.Role)
            });
            connection.end();
        } else {
            const connection = mysql.createConnection(connectionString);
            connection.connect();
            connection.query('SELECT * from USERTYPE', function(err, results, fields) {
                if (err) throw err
                res.render('./account/addUser', { title: "Thêm người dùng mới", data: results, sMessage: "* Xác nhận mật khẩu sai" })
            })
            connection.end();
        }
    }
    //#endregion

//#region Delete User
const DeleteUser = function(req, res, next) {
        var Id = req.body.ID
        console.log(Id);
        const connection = mysql.createConnection(connectionString);
        connection.connect();
        var query = connection.query('UPDATE USER SET IsDeleted = ?, Log_UpdatedDate = ? WHERE ID = ?', [true, require('moment')().format('YYYY-MM-DD HH:mm:ss'), Id], function(err, results, fields) {
            if (err) throw err
            console.log('Delete successfully !!!')
        })
        query = connection.query('SELECT * FROM USER WHERE ID = ?', [Id], function(err, results, fields) {
            if (err) throw err
            console.log(results)
            var roleId = results[0].Role
            res.redirect('/user?UserType=' + roleId)
        })
        connection.end();
    }
    //#endregion

//#region Edit User
const EditUser = function(req, res, next) {
        var updatedItem = {
            Role: req.body.Role,
            Status: req.body.Status,
            Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        }
        const connection = mysql.createConnection(connectionString);
        connection.connect();
        connection.query('UPDATE USER SET Role = ?, Status = ? , Log_UpdatedDate = ? WHERE ID = ?', [updatedItem.Role, updatedItem.Status, updatedItem.Log_UpdatedDate, req.body.ID], function(err, results, fields) {
            if (err) throw err;
            console.log('Update successfully!!!')
        })
        var query = connection.query('SELECT * FROM USER where ID = ?', [req.body.ID], function(err, results, fields) {
            if (err) throw err;
            var roleId = results[0].Role
            res.redirect('/user?UserType=' + roleId)
        })
        connection.end();
    }
    //#endregion

//#region Single by Username
const SingleByUsername = function(username) {

    }
    //#endregion

//#region Login
const Login = async function(req, res, next) {
        var username = req.body.Username
        var password = req.body.Password
        var msg = ''
        var data = ''
        const connection = mysql.createConnection(connectionString)
        connection.connect()
        connection.query('SELECT * FROM USER WHERE Username = ?', [username], function(err, results, fields) {
            if (err) throw err
            if (results.length === 0) {
                msg = ''
            } else {
                data = results[0]
                console.log(data.Password)
                console.log(password)
                if (bcrypt.compareSync(password, data.Password)) {
                    req.session.isAuth = true
                    req.session.authUser = data
                    res.redirect('/')
                } else {
                    res.redirect('/login')
                }
            }
        })
        connection.end()
    }
    //#endregion

module.exports = {
    ListUser,
    AddNewUser,
    DeleteUser,
    EditUser,
    SingleByUsername,
    Login,
}