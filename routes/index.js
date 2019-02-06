const express = require('express'),
      router = express.Router();

//import pokemon model
const Pokemon = require('../models/Pokemon');

//import types file
const types = require('../public/types');

//GET routes
//index/home page
router.get('/',(req,res) => {
  res.render('index');
});

//types page
router.get('/types', (req,res) => {
  res.render('types', {types: types});
  // console.log(types[0])
});

//SHOW by type
router.get('/:type',(req,res) => {
  const type = req.params.type;
  Pokemon.find({ type: type },(err,pokemon) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('type', {pokemon: pokemon});
    }
  });
});

//get registration page
router.get('/register',(req,res) => {
  res.render('register');
});

//get login page
router.get('/login', (req,res) => {
  res.render('login');
});

module.exports = router;