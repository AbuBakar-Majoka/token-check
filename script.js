const auth = require('./middleware');
const express = require('express');
const path = require('path');
var jwt = require('jsonwebtoken');
const app = express()
const port = 5000
const secretKey = "mykey";

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})


app.post('/signup', (req, res) => {
    let {email , password} = req.body;

    var token = jwt.sign({ email , password }, secretKey);
    req.headers.token = token;

    auth(req, res, () => {
        if (email == req.user.email && password == req.user.password) {
        return res.status(200).json({
            msg :"success"
        })
    } 

    return res.status(401).json({
        msg :"invalid credientials",
    })
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})