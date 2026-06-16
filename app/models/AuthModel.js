const db = require('../../config/database');

class AuthModel {

    static async create (data){
         console.log('data di model',data);
        const sql = 'INSERT INTO users (email, username, password_hash) VALUES ($1,$2, $3)';
        const result = await db.query(sql,[
            data.email,
            data.username,
            data.password_hash
        ])
        return result.rows;
    }

    static async findEmail(email){
        console.log(email);
        const sql = 'Select * FROM users WHERE email =$1';
        const result = await db.query(sql,[email]);
        return result.rows;
    }

    static async isactive (data){
        const sql ='UPDATE users SET is_active = TRUE WHERE email = $1';
        const result = await db.query(sql,[data]);
        return result.rows;
    }

}
module.exports = AuthModel;