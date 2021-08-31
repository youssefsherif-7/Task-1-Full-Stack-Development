const express = require('express');
const morgan = require('morgan');
const mongoose = require ('mongoose');
const blogroutes = require('./routes/blog-routes');
var axios = require("axios").default; 
const yah = require ('./jokes');


// express app
const app = express();

//connect to mongodb
const dbURL = 'mongodb+srv://pepsika:ert123ert123@cluster0.jjf7i.mongodb.net/nodejs-tutorial?retryWrites=true&w=majority';
mongoose.connect(dbURL).then((result) => app.listen(process.env.PORT||3000)).catch((err) => console.log(err));

//Middleware and Static Files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// register view engine
app.set('view engine', 'ejs');



//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
   
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'}); 
});

//blog routes
app.use(blogroutes);

app.use(yah);


app.use((req, res) =>{
    res.status(404).render('404', {title: 'Error'});
});

