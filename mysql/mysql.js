/**
 * mysql数据库操作封装
 */
let mysql = require("mysql");

/**
 * 数据库连接信息
 * @type {string}
 */
let username = 'root';
let password = 'root';
let db_host = 'localhost';
let db_port = 3306;
let db_name = 'car';
let option = {
    host: db_host,
    port: db_port,
    user: username,
    password: password,
    database: db_name
};

/**
 * sql语句执行接口
 * @param sqls
 * @param values
 * @param after
 * @private
 */
function _exec(sqls,values,after) {
    let client = mysql.createConnection(option);

    client.connect(function(err){
        if (err) {
            console.log(err);
            return;
        }

        client.query(sqls || '', values || [],function(err,r){
            after(err,r);
        });
        client.end();

    });
    client.on('error',function(err) {
        if (err.errno != 'ECONNRESET') {
            after("err01",false);
            throw err;
        } else {
            after("err02",false);
        }
    });
}
exports.exec = _exec;