const db = require('../../config/database_con_biasa');

class InvoiceModel {

    static async all(){
        // const [rows] = await db.query('SELECT * FROM invoice') query untuk db MYSQL;
        // return rows
        const result = await db.query(
            'SELECT * FROM invoice'
        );
        return result.rows;
    }
    
    static async create (data) {
        
        const sql = 'INSERT INTO invoice (ID_in, no, description, tic_number, nominal , total, nama_instansi, alamat, teruntuk, date_issuance, due_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';
        await db.query(sql, [
                            data.id_in, 
                            data.no, 
                            data.description, 
                            data.tic_number, 
                            data.nominal, 
                            data.total,
                            data.nama_instansi,
                            data.alamat,
                            data.teruntuk,
                            data.date_issuance,
                            data.due_date 
                        ]);
    }

    static async getLatest(){
        // Biasa
            const result = await db.query(
                'SELECT no FROM invoice ORDER BY tggl_data_masuk DESC LIMIT 1'
            );
            console.log("get_id",result);
            return result.rows;

        // Menggunkan sequelize
            // const [rows] = await db.query(
            //     'SELECT no FROM invoice ORDER BY tggl_data_masuk DESC LIMIT 1'
            // );

            // return rows[0];
        
    }

    static async findByNo(no){
        const sql = `SELECT * FROM invoice WHERE no=$1`;
        const result = await db.query(sql,[no]);
        return result.rows;
    }

    static async finByNo_stbrs(){
        const sql = `SELECT DISTINCT ON (no) *
                        FROM invoice
                        ORDER BY no DESC, tggl_data_masuk DESC;`;
        const result = await db.query(sql);
        return result.rows;
    }

    static async update(id_in, data){
        const {
                no,
                description,
                tic_number,
                nominal,
                total,
                nama_instansi,
                alamat,
                teruntuk,
                date_issuance,
                due_date
            } = data;
           
        const sql =`UPDATE invoice 
                    SET no=$1,
                        description=$2,
                        tic_number=$3,
                        nominal=$4,
                        total=$5,
                        nama_instansi=$6,
                        alamat=$7,
                        teruntuk=$8,
                        date_issuance=$9,
                        due_date=$10
                        WHERE id_in=$11 `;
        const result =await db.query(sql,[no,description,tic_number, nominal, total, nama_instansi, alamat, teruntuk, date_issuance,due_date,id_in]);
        // console.log(sql);
        // console.log(result.rowCount);
        return result.rows;
    }

    static async delete(data){
        const sql = 'DELETE FROM invoice WHERE no=$1';
        const result = await db.query(sql,[data]);
        return result.rows;
    }

    // ambil data id_in berdasrakan no untuk kebutuhan hapus baris data dari edit

    static async getid_infromdb(data){
        // console.log("hasil data fromedit", data);
        const sql = 'SELECT id_in FROM invoice WHERE no=$1';
        const result = await db.query(sql,[data]);
        // console.log("hasil reslut",result.rows);
        return result.rows;
    }

    static async deleteid_in(iddelete){
        const sql = 'DELETE FROM invoice WHERE id_in=$1';
        const result = await db.query(sql,[iddelete]);
        return result.rows;
    }

}

    module.exports = InvoiceModel;