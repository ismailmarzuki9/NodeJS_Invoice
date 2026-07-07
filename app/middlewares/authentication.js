const jwt = require("jsonwebtoken");

function authentication(req, res, next) {

    const token = req.cookies.accessToken;

    if (!token) {

        // return res.status(401).json({
        //     message: "Access Token tidak ditemukan"
        // });
        return res.redirect("/login");

    }

    try {

        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = payload;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Token tidak valid"
        });

    }

}

module.exports = authentication;