const express = require('express'),
      router = express.Router(),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser');

//import pokemon model
const Pokemon = require('../models/Pokemon');

//use method override
router.use(methodOverride("_method"));

//use body parser
router.use(bodyParser.urlencoded({extended: true}));

//list of pokemon
router.get('/pokedex',(req,res) => {
  Pokemon.find({},(err,pokemon) => {
    if(err){
      console.log(err);
    } else {
      res.render('pokedex', {pokemon: pokemon});
    }
  });
});

//new pokemon creation page
router.get('/pokedex/new',(req,res) => {
  res.render('new');
});

//SHOW by ID
router.get('/pokedex/:id',(req,res) => {
  Pokemon.findById(req.params.id, (err,foundPokemon) => {
    if (err) {
      console.log(err);
      res.redirect('/pokedex');
    } else {
      res.render('show',{pokemon: foundPokemon});
    }
  });
});

//POST routes
//new pokedex entry
router.post('/pokedex',(req,res) => {
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
router.get('/pokedex/:id/edit',(req,res) => {
  Pokemon.findById(req.params.id,(err, foundPokemon) => {
    if (err) {
      console.log(err);
      res.redirect('/pokedex');
    } else {
      res.render('edit',{pokemon: foundPokemon});
    }
  });
});

//UPDATE route
router.put('/pokedex/:id',(req,res) => {
  Pokemon.findByIdAndUpdate(req.params.id, 
      req.body.pokemon, 
      function (err, updatedPokemon) {
        if (err) {
          console.log(err);
          res.redirect('/pokedex');
        } else {
          res.redirect('/pokedex/' + req.params.id);
        }
      });
});

//DELETE entry
router.delete('/pokedex/:id',(req,res) => {
  Pokemon.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/pokedex');
    }
  });
});

module.exports = router;