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

}
module.exports = AuthModel;