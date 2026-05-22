const express = require ('express');
const path = require('path');
const routes = require('./app/routers/web');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(expressLayouts);
// arahkan ke templet nya
 app.set('layout', 'templet/templet');

app.use(express.static('public'));

app.use('/', routes);

// start server
app.listen(4000,() => {
  console.log('Server running on http://localhost:4000');
});
