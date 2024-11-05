var jwt = require('jsonwebtoken');

function auth(req, res, next){
    let token = req.headers.token;
    const secretKey = "mykey";
    if(token){
        try {
            var decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({
                msg : "Error occurs",
            })
        }
    } else{
        res.status(500).json({
            msg :"no token found",
        })
    }
}

module.exports = auth;