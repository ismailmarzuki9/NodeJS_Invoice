// file untuk mengecek apakah role user di izinkan untuk mengakases halaman dimana daftar role user berdasrakan apa yang di kirim dari route.
function authorize(...roles) {

    return function (req, res, next) {

        // 1. Pastikan user sudah login
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Ambil role user yang sedang login
        const userRole = req.user.role;

        // 3. Cek apakah role user ada di daftar role yang diizinkan
        if (roles.includes(userRole)) {
            return next();
        }

        // 4. Jika role tidak sesuai
        return res.status(403).json({
            message: "Forbidden"
        });

    };

}

module.exports = authorize;

// Function authorize(role yang diizinkan)
//     return middleware
//         cek apakah req.user ada
//             jika tidak
//                 return Unauthorized
//         cek role user
//             apakah termasuk role yang diizinkan?
//                 Ya
//                   next()
//                 Tidak
//                     Forbidden

// End Function