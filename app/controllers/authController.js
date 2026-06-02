const { Result } = require ('pg');  
const AuthModel  = require('../models/AuthModel');
const bcrypt = require('bcrypt'); // menggunakan hash bacrypt code orang lain yg di ambil dari node js

class Auth {

    static async create_view (req, res) {
        res.render('author/reqister');
    }

    static async post (req, res){
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

            res.render('/daftarInvoice');

        } catch (error) {
            
        }
    }

    static async loginView(req, res){
        res.render('author/login')
    }
    static async loginPost(req, res){
        const data = ValidationResult(req);

        if (!data.isEmpty) {
            return res.render('author/login',{
                errors :errors.arryay()
            });
        }

        const token = await AuthService.login(
            req.body.email,
            req.body.password
        )

        if (!token){
            return res.render('auth/login', {
                errors: [{ msg: 'Email atau password salah' }]
            });
        }
        
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    }
}

module.exports= Auth;
