require('dotenv').config()

const router = require("../routes")
var mysql = require('mysql');
const { hashSync } = require('bcryptjs');
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
        var UserType = req.query.UserType
        console.log(connectionString)
        const connection = mysql.createConnection(connectionString)
        var title = ""
        connection.connect()
        connection.query('SELECT * FROM USERTYPE WHERE ID = ?', [UserType], function(err, results, fields) {
            if (err) throw err
            title = results[0].Role
        })
        connection.query('SELECT * FROM USER WHERE ROLE = ?', [UserType], function(err, results, fields) {
            if (err) throw err
            console.log(results)
            res.render('./account/listUser', { title: 'Danh sách người dùng ' + title, data: results })
        })
        connection.end()
    }
    //#endregion

//#region Add User
const AddNewUser = function(req, res, next) {
        var newItem = {
            Username: req.body.Username,
            Password: hashSync(req.body.Password, 10),
            Email: req.body.Email,
            Role: req.body.Role,
            Log_CreatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        }
        console.log(newItem)
        if (req.body.Password === req.body.ConfirmPassword) {
            const connection = mysql.createConnection(connectionString);
            connection.connect();
            var query = connection.query('INSERT INTO USER SET ?', [newItem], function(error, results, fields) {
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


module.exports = {
    ListUser,
    AddNewUser,
}