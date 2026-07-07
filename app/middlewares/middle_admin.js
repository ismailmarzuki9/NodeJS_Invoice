function middle_users_akses(req, res, next) {

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if (req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        message: "Forbidden"
    });

}

module.exports = middle_users_akses;

// FUNCTION middle_user_akses(request,response,next)

//     Apakah user sudah login?

//         jika belum

//             kembalikan error login

//     Ambil role dari request.user

//     jika role == admin

//         lanjut ke controller

//     selain admin

//         tampilkan Forbidden

// END FUNCTION