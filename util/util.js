const mysql = require("mysql");
const util = require("util");
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERID,
  password: process.env.PASSWORD,
  database: process.env.DB,
  connectionLimit: 50,
});

const poolQuery = util.promisify(pool.query.bind(pool));
module.exports = {
  load: (sql) => poolQuery(sql),
  add: (entity, tableName) =>
    poolQuery(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) =>
    poolQuery(`delete from ${tableName} where ?`, condition),
  patch: (sql) =>
    poolQuery(sql),
};