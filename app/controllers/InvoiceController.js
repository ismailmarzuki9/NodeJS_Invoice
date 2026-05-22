const { Result } = require('pg');
const invoicemodel = require('../models/InvoiceModel');

class InvoiceController {
    
    static async create(req, res) {

        const rows = await invoicemodel.getLatest();

        let noBaru = 2020;

        if (rows.length > 0) {
            noBaru = rows[0].no + 1;
        }

        res.render('invoice/create', { noBaru });
    }

    static async post(req, res){
        try
        {
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
            } = req.body;
  
            // simpan ke database di sini
            for (let i =0; i < description.length; i++){
                await invoicemodel.create({
                    id_in : Date.now() + i,
                    no,
                    description : description[i],
                    tic_number : tic_number[i],
                    nominal : nominal[i],
                    total,
                    nama_instansi,
                    alamat,
                    teruntuk,
                    date_issuance,
                    due_date
                });
            }

            // console.log("No id : "+ no);           
            res.redirect('/print/'+ no);
            
        }catch (error)
        {
            console.error(error);
            // kirim respon gagal
            return res.status(500).json("Gagal menyimpan data");
        }

    }

    static async print(req, res){

        const no = req.params.no;
        const data = await invoicemodel.findByNo(no);
        // console.log(data);
        res.render('invoice/print', {data})
    }

    static async daftarInvoice(req, res){
        const data = await invoicemodel.finByNo_stbrs();
        // console.log(data);
        res.render('invoice/daftarInvoice', {data});
    }

    static async editinvoice(req,res){
        const dataNo = req.params.no;
        const datahasilquery= await invoicemodel.findByNo(dataNo);
        res.render('invoice/edit',{datahasilquery});
    }

    static async editinvoicepost(req, res){
       
        console.log("Data from edit", req.body);
        try{
             const {
                        id_in,
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
                    } = req.body; //Perlu di descripsikan
            
            // get data id_in dari Db berdasrkan no yang di kirim
            const noFromDb = await invoicemodel.getid_infromdb(no);
            // console.log("data hasil q", noFromDb);
            const ubfdb= noFromDb.map(item => item.id_in); // <-- rubah ke bentuk array
            console.log("hasil perubahan ke arry data dari db", ubfdb);

            // get data id_in dari halam edit termasuk yang nan
            const noFromEdit = req.body.id_in || [];
            console.log("data dari edit.ejs", noFromEdit);

            const idsToDelete = ubfdb.filter(
                iddelete => !noFromEdit.includes(iddelete)
            );
            console.log("ini data yg terhapus",idsToDelete);

            for(const iddelete of idsToDelete){
                await invoicemodel.deleteid_in(iddelete);
            }

            for (let i = 0; i < description.length; i++) {

                ///===
                const id =id_in[i];

                const data ={
                    id_in : id || Date.now()+1,
                    no, 
                    description : description[i],
                    tic_number : tic_number[i],
                    nominal : nominal[i],
                    total,
                    nama_instansi,
                    alamat,
                    teruntuk,
                    date_issuance,
                    due_date
                };
                if (id){
                    await invoicemodel.update(
                        id,
                        data
                    );
                }else{
                    await invoicemodel.create(
                        data
                    );
                }
                ///===

                // const id = req.body.id_in[i]
                // const description = req.body.description[i]
                // const nominal = req.body.nominal[i]
                // const tic_number = req.body.tic_number[i]

                // if (id != undefined) {
                    
                //     await invoicemodel.update(id_in[i], {
                //         id_in : id_in[i],
                //         no : no,
                //         description : description,
                //         tic_number : tic_number,
                //         nominal : nominal,
                //         total,
                //         nama_instansi,
                //         alamat,
                //         teruntuk,
                //         date_issuance,
                //         due_date
                //     });
                // }else {
                //     await invoicemodel.create({
                //         ID_in : Date.now() + i,
                //         no : no,
                //         description : description,
                //         tic_number : tic_number,
                //         nominal : nominal,
                //         total,
                //         nama_instansi,
                //         alamat,
                //         teruntuk,
                //         date_issuance,
                //         due_date
                //     });
                // }
            }

            res.redirect('/print/'+no);

        }catch (error){
            console.error(error);
            // kirim respon gagal
            return res.status(500).json("Gagal menyimpan data");
        }
    }

    static async delete(req, res){
        console.log("MASUK DELETE FROM show");
        const data = req.params.no;
        const dataqury = await invoicemodel.delete(data);
        res.redirect('/daftarInvoice')
    }

    
}

module.exports = InvoiceController