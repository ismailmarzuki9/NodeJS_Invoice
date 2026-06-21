const db = require('../../config/database');
const tb_user = require('../migrations/createTabelUsers');

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

    // static async findEmail(email){
    //     console.log(email);
    //     // const sql = 'Select * FROM users WHERE email =$1';
    //     // const result = await db.query(sql,[email]);
    //     // return result.rows;

    //     // cara dengan sequelize
    //     // const [sql] = await db.query(
    //     //     'Select * FROM users WHERE email =$1'
    //     //     [email]
    //     // );
    //     // return sql[0];
    // }

    static async findEmail(email) {
        return await tb_user.findOne({
            where: { email }
        });
    }

    static async updateRefreshToken(userid, refreshToken) {
        return await tb_user.update(
            { refresh_token: refreshToken },
            {
                where: { userid }
            }
        );
}

    // static async isactive (data){
    //     const sql ='UPDATE users SET is_active = TRUE WHERE email = $1';
    //     const result = await db.query(sql,[data]);
    //     return result.rows;
    // }

    static async isactive (email){
        console.log(email)
        return await tb_user.update(
            { is_active : true },
            { where : {email}} // karena variabel yang digunkan sama maka dari {email: email} bisa jadi {email}
        );
    }

}
module.exports = AuthModel;