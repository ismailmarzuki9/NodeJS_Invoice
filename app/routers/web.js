const express = require('express');
const router = express.Router();

const invoiceController = require('../controllers/InvoiceController');

// invoice router 
router.get('/', invoiceController.create);
router.post('/simpan', invoiceController.post);
router.get('/print/:no', invoiceController.print);
router.get('/daftarInvoice', invoiceController.daftarInvoice);
router.get('/invoice/:no/edit', invoiceController.editinvoice);
router.post('/invoice/:no/edit', invoiceController.editinvoicepost);
router.post('/delete/invoice/:no', invoiceController.delete);   

// router.post('/delete/edit/:id_in', (req,res)=>{
//     console.log("ROUTE TEST");
//     res.send("OK");
// });

// Authentication 
router.get('/',)


module.exports = router;