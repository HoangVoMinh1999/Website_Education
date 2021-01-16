require('dotenv').config()
const router = require("../routes")
const UserService = require("../Service/UserService")

var mysql = require('mysql');
const bcrypt = require('bcryptjs');
var session = require('express-session');
const { singleByUsername } = require('../Service/UserService');
const { use } = require('../routes');

let sMessage = ''
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
const ListUser = async function(req, res, next) {
        let listData = []
        let userType = 'Danh sách người dùng'

        let roleId = req.query.Role
        if (roleId === undefined) {
            listData = await UserService.all()
        } else {
            userType = await UserService.getUserType(roleId)
            userTypeId = userType[0].ID
            listData = await UserService.getUsersByUserType(userTypeId)
        }
        res.render('./account/listUser', {
            title: userType[0].Role,
            data: listData,
        })
    }
    //#endregion

//#region Add User
const AddNewUser = async function(req, res, next) {
        var newItem = {
            Username: req.body.Username,
            Password: bcrypt.hashSync(req.body.Password, 10),
            Email: req.body.Email,
            Role: req.body.Role,
            Status: req.body.Status,
            Log_CreatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        }

        let user = await UserService.singleByUsername(newItem.Username)
        console.log(user);
        if (user !== undefined) {
            sMessage = 'Ten tai khoan da ton tai'
            console.log(sMessage);
            res.redirect('/add-user')
        } else {
            await UserService.add(newItem)
            res.redirect('/add-user')
        }
    }
    //#endregion

//#region Delete User
const DeleteUser = async function(req, res, next) {
        var Id = req.body.ID
        let typeId = ''
        let user = await UserService.single(Id)
        if (user !== null) {
            typeId = user.Role
            await UserService.delete(Id)
        } else {
            console.log('Không tìm thấy người dùng')
        }
        res.redirect('/user?Role=' + typeId)
    }
    //#endregion

//#region Edit User
const EditUser = async function(req, res, next) {
        var typeId = ''
        var ID = req.body.ID
        var updatedItem = {
            ID: ID,
            Role: req.body.Role,
            Status: req.body.Status,
            Log_UpdatedDate: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
        }
        let user = await UserService.single(ID)
        console.log(user);
        if (user !== null) {
            typeId = user.Role
            await UserService.updateUser(updatedItem.ID, updatedItem.Role, updatedItem.Status, updatedItem.Log_UpdatedDate)
        }
        res.redirect('/user?Role=' + typeId)
    }
    //#endregion

// // #region Single by Username
// const SingleByUsername = function(username) {

//     }
//     //#endregion

//#region Login
const Login = async function(req, res, next) {
        const user = await singleByUsername(req.body.Username)
        if (user === null) {
            return res.redirect('/login')
        }
        const ret = bcrypt.compareSync(req.body.Password, user.Password)
        if (ret === false) {
            return res.redirect('/login')
        } else {
            req.session.isAuth = true
            req.session.authUser = user
            if (user.Role === 1){
                req.session.isAdmin = true;
                req.session.isTeacher = true;
            }
            else if (user.Role === 2){
                req.session.isTeacher = true
            }
            res.redirect('/')
        }
    }
    //#endregion

////#region Logout
const Logout = async function(req, res, next) {
        req.session.isAuth = false
        req.session.authUser = null
        res.redirect(req.headers.referer)
    }
    //#endregion


module.exports = {
    ListUser,
    AddNewUser,
    DeleteUser,
    EditUser,
    // SingleByUsername,
    Login,
    Logout,
}