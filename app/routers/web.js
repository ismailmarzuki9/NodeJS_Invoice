const express = require('express');
const router = express.Router();

const invoiceController = require('../controllers/InvoiceController');
const authController = require('../controllers/authController');

const authentication = require('../middlewares/authentication'); // ini untuk membatasi halama atau route mana saja yang hanya bisa di akases saat login

// invoice router 
router.get('/', invoiceController.create);
router.post('/simpan', invoiceController.post);
router.get('/print/:no', invoiceController.print);
router.get('/daftarInvoice', authentication, invoiceController.daftarInvoice);
router.get('/invoice/:no/edit', invoiceController.editinvoice);
router.post('/invoice/:no/edit', invoiceController.editinvoicepost);
router.post('/delete/invoice/:no', invoiceController.delete);   


// Authentication 
router.get('/auth/register', authController.create_view);
router.post('/postregister', authController.postregister);
router.get('/login', authController.loginView);
router.post('/login', authController.loginPost);
// router.post('/postregister', (req, res) => {
//     console.log('ROUTE HIT');
//     console.log(req.body);
//     res.send('OK');
// });
router.get('/logout', authentication, authController.logout);


module.exports = router;