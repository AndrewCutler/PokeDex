const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//start express app
const app = express();

//set public directory
app.use(express.static(__dirname + '/public'));

//set view engine
app.set('view engine', 'ejs');

//connect mongoose to mongo
mongoose.connect('mongodb://localhost:27017/pokedex', {useNewUrlParser: true});

//index/home page
app.get('/',(req,res) => {
  res.render('index');
});

//list of pokemon
app.get('/pokedex',(req,res) => {
  res.render('pokedex');
});

port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));