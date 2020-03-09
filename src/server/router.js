const db = require('../db/db');



getGoods = (req, res) => {
    let sql = 'select * FROM goods'
    db.base(sql, null, (result) => {
        res.send(result)
    })
}
queryGoods = (req, res) => {
    let query = req.query.id;
    // console.log(req)
    let sql = 'select * from goods where id=' + query + '';
    db.base(sql, query, (result) => {
        res.send(result);
    })
}

loginValidate = (req, res) => {
    let query = req.body;

    let sql = 'select username,password from user where username=' + "'" + query.username + "'" + 'and password=' + "'" + query.password + "'";
    // console.log(sql)


    db.base(sql, query, (result) => {
        if (result.length > 0) {
            result = {
                username: result[0].username,
                isloging: 'success'
            }
            res.send(result)

        }
        else {
            result = {
                isloging: 'fail'
            }
            res.send(result);
        }


    })
}

getClass = (req, res) => {

    let sql = 'SELECT * FROM class';

    db.base(sql, null, (result) => {
        res.send(result)
    })
}

getCategorys = (req, res) => {

    let sql = 'SELECT * FROM categorys';

    db.base(sql, null, (result) => {
        res.send(result)
    })
}


exprots = module.exports = {
    getGoods,
    queryGoods,
    loginValidate,
    getClass,
    getCategorys
}