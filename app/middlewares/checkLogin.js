const jwt = require("jsonwebtoken");

function checkLogin (req, res, next){
    //default
    res.locals.isLogin= false;
    res.locals.user = null;

    // mengambil acces tokent dari cookie
    const token =req.cookies.accessToken;

    if(!token){
        return next();
    }
    try{
        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        // simpan ke request
        req.user = payload;

        // kirim ke semua EJS
        res.locals.isLogin = true;
        res.locals.user = payload;

    }catch (err) {

        res.locals.isLogin = false;
        res.locals.user = null;

    }

    next ();
}

module.exports = checkLogin;