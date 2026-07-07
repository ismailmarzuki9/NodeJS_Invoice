const { Result } = require ('pg');  
const AuthModel  = require('../models/AuthModel');
const bcrypt = require('bcrypt'); // menggunakan hash bacrypt code orang lain yg di ambil dari node js
const jwt = require('jsonwebtoken');

class Auth {

    static async create_view (req, res) {
        res.render('author/reqister');
    }

    static async postregister (req, res){
        console.log(req.body);
        try {
            const {
                username,
                email,
                role,
                password
            } = req.body;

            // const password2 = req.body.password;
            const password_hash = await bcrypt.hash(req.body.password, 10);
            console.log(password_hash);
            //simpan ke db
            await AuthModel.create({
                username,
                email,
                role,
                password_hash
            });

            res.redirect('/login');

        } catch (error) {
            
        }
    }

    static async loginView(req, res){
        res.render('author/login')
    }
    static async loginPost(req, res){
        try {
            console.log("Body:", req.body);
            console.log("Headers:", req.headers);
            const {email, password} = req.body
            const cekEmail= await AuthModel.findEmail(email);
            console.log('cekemail',cekEmail);
            if(!cekEmail){
                console.log("Email tidak di temukan")
                return res.render('author/login') // return berfungsi agar code di bawahnya tidak di exsekusi
            }else
            if (cekEmail) {
                // cek password
                const getPassword =cekEmail.password_hash;
                console.log('ambil password', getPassword);
                console.log("cek password");
                const validPassword = await bcrypt.compare(
                    password, // password dari from logn
                    getPassword // password dari query di model
                );
                console.log('cek valipass', validPassword);
                if(!validPassword){
                    console.log('Password salah');
                    return res.redirect('/login'); // redirect mengembalikakan ke URL sedangkan render langsung ke views dalam hal ini pada directory author/login
                }

                const payload = {
                    userid: cekEmail.userid,
                    email: cekEmail.email,
                    role: cekEmail.role
                };
                // JWT mengakses token dari file env
                const accessToken = jwt.sign(
                    payload, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                    expiresIn: '20m'
                    }
                );

                const refreshToken = jwt.sign({ email:email }, process.env.REFRESH_TOKEN_SECRET,
                    {
                    expiresIn: '1d'
                    }
                );
                const userid = cekEmail.userid;
                const dateNow = new Date().toISOString(); // untuk menampilkan ke view .toLocaleString('id-ID')
                console.log("tanggal nya", dateNow);
                await AuthModel.updateRefreshToken( userid, refreshToken, dateNow );

                // http only cookie
                // res.cookie('refreshToken', refreshToken, {
                //     httpOnly : true,
                //     maxAge : 24 * 60 * 60 * 1000,
                //     secure : true
                // });

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 15 * 60 * 1000
                });

                // res.json({ accessToken});
                console.log(accessToken);

                // update tabel user is active
                const isActive = await AuthModel.isactive(email);

                res.redirect('/');
            }
            
        } catch (error) {
            console.log(error);
            res.send(error.message);            
        }
    }

    static async logout(req, res) {

        const userid = req.user.userid;

        await AuthModel.updateRefreshTokenLogout(userid, null);

        // res.clearCookie("accessToken");
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        // res.clearCookie("refreshToken");
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.redirect("/login");

    }
}

module.exports= Auth;
