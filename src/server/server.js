const express = require('express');
const router = require('../server/router');
const bodyParser = require('body-parser')


const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();


//设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})

app.get('/api/getList', router.getGoods);

app.get('/api/queryGoods', router.queryGoods);


app.post('/api/loginin', jsonParser, router.loginValidate);


app.get('/api/getclass', router.getClass);

app.get('/api/getcat', router.getCategorys);

app.listen(3000, (req, res) => {

    console.log("server is running");
    console.log("********************************");
})
