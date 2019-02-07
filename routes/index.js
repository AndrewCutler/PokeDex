const express = require('express'),
      router = express.Router(),
      passport = require('passport');

//import pokemon model
const Pokemon = require('../models/Pokemon');
//import user model
const User = require('../models/User');

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
router.get('/types/:type',(req,res) => {
  const type = req.params.type;

  //only render types that exist
  const match = types.some(t => t.name === type);

  Pokemon.find({ type: type }, (err,pokemon) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      if (match) {
        res.render('type', {pokemon: pokemon});
      } else {
        //if type in /types/:id doesn't exist, redirect to types
        res.redirect('/types');
      }
    }
  });
});

//get registration page
router.get('/register',(req,res) => {
  res.render('register');
});

//POST registration page
router.post('/register',(req,res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  console.log(user);
});

//get login page
router.get('/login', (req,res) => {
  res.render('login');
});

//POST login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login' })
);

module.exports = router;