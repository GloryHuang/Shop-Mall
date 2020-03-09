/**
 * 封装操作数据库的通用api
 */
const mysql = require('mysql');


exports.base = (sql, parms, callback) => {
    //创建数据库连接

    const connection = mysql.createConnection({
        host: '104.223.56.160',//数据库所在的服务器的域名或者IP地址
        user: 'shop',   //登录数据库的账号
        password: '5841125411',   //登录数据库的密码
        database: 'shop'//数据库名称
    });

    //执行连接操作
    connection.connect();


    //操作数据库(数据库操作也是异步的)
    connection.query(sql, parms, (err, results, fields) => {

        if (err) {
            throw err
        }
        else {
            callback(results);
        }

    })
    //关闭数据库
    connection.end();
}