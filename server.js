//import libraries
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

//import pokemon model
const Pokemon = require('./models/Pokemon');

//start express app
const app = express();

//set public directory
app.use(express.static(__dirname + '/public'));

//use body parser
app.use(bodyParser.urlencoded({extended: true}));

//connect mongoose to mongo
mongoose
  .connect('mongodb://localhost:27017/pokedex', {useNewUrlParser: true})
  .then(console.log('connected to MongoDB'))
  .catch(err => console.log(err));


//set view engine
app.set('view engine', 'ejs');


//GET routes
//index/home page
app.get('/',(req,res) => {
  res.render('index');
});

//list of pokemon
app.get('/pokedex',(req,res) => {
  Pokemon.find({},(err,pokemon) => {
    if(err){
      console.log(err);
    } else {
      res.render('pokedex', {pokemon: pokemon});
    }
  });
});

//new pokemon creation page
app.get('/pokedex/new',(req,res) => {
  res.render('new');
});


//POST routes
//new pokedex entry
app.post('/pokedex',(req,res) => {
  Pokemon.create(req.body.pokemon,(err,pokemon) => {
    if(err) {
      console.log(err);
      res.redirect('/pokedex/new');
    } else{
      res.redirect('/pokedex');
    }
  });
});


// EDIT routes
//show by id
app.get('/pokedex/:id/edit',(req,res) => {
  Pokemon.findById(req.params.id,(err, foundPokemon) => {
    if (err) {
      console.log(err);
      res.redirect('/pokedex');
    } else {
      res.render('edit',{pokemon: foundPokemon});
    }
  });
});

port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));

//FIGURED THINGS OUT:
// DB name: pokedex
// collection name: pokemons

// TODO:
// allow editing on edit page
// organize pokedex index page
// add delete route
// create pages for each type, showing weaknesses/strengths and 
// all pokemon of that type