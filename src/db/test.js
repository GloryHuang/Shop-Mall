const express = require('express');
const db = require('./db');
const app = express();

app.use('/', (req, res) => {
    // res.send('ok');
    // res.json('result');

    let sql = 'select * FROM goods'
    db.base(sql, null, (result) => {
        console.log('is ok')
        res.send(result)

    })
})

app.listen(3001, (req, res) => {
    console.log("is running");
    console.log("********************************");

})
