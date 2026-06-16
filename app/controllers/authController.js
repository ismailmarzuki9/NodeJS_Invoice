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
                password
            } = req.body;

            // const password2 = req.body.password;
            const password_hash = await bcrypt.hash(req.body.password, 10);
            console.log(password_hash);
            //simpan ke db
            await AuthModel.create({
                username,
                email,
                password_hash
            });

            res.render('/invoice/daftarInvoice');

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
            const cekEmail = await AuthModel.findEmail(email);
            console.log('cekemail',cekEmail);
            if(cekEmail.length === 0){
                console.log("Email tidak di temukan")
                return res.render('author/login') // return berfungsi agar code di bawahnya tidak di exsekusi
            }else
            if (cekEmail.length > 0) {
                // cek password
                const getArry0 =cekEmail[0];
                console.log('ambil arry ke 0', getArry0);
                console.log("cek password");
                const validPassword = await bcrypt.compare(
                    password, // password dari from logn
                    getArry0.password_hash // password dari query di model
                );
                console.log('cek valipass', validPassword);
                if(!validPassword){
                    console.log('Password salah');
                    return res.redirect('/login'); // reirect mengembalikakan ke URL sedangkan render langsung ke views dalam hal ini pada directory author/login
                }

                // JWT mengakses token dari file env
                const accessToken = jwt.sign({ email:email }, process.env.ACCESS_TOKEN_SECRET,
                    {
                    expiresIn: '20s'
                    }
                );

                const refreshToken = jwt.sign({ email:email }, process.env.REFRESH_TOKEN_SECRET,
                    {
                    expiresIn: '1d'
                    }
                );

                await AuthModel.update({refresh_token: refreshToken},{
                    where :{
                        id:userid // melakukan updateberdasarkan userid pada model AuthModel
                    }
                });

                // http only cookie
                res.cookie('refreshToken', refreshToken, {
                    httpOnly : true,
                    maxAge : 24 * 60 * 60 * 1000,
                    secure : true
                });

                res.json({ accessToken});
                console.log(res.json({accessToken}));

                // update tabel user is active
                const isActive = await AuthModel.isactive(email);

                res.redirect('/');
            }
            
        } catch (error) {
            console.log(error);
            res.send(error.message);            
        }
    }
}

module.exports= Auth;
