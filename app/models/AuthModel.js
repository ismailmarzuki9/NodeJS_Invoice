const db = require('../../config/database');

class AuthModel {

    static async create (data){
         console.log('data di model',data);
        const sql = 'INSERT INTO users (username, email, password_hash) VALUES ($1,$2, $3)';
        const reslut = await db.query(sql,[
            data.username,
            data.email,
            data.password_hash
        ])
        return result.rows;
    }

    static async findEmail(data){
        console.log(data);
        const sql = 'Select * FROM users WHERE email =$1';
        const result = await db.query(sql,[data]);
        return result.rows;
    }

}
module.exports = AuthModel;