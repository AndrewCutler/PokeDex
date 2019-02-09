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
  res.render('register', {invalidCredentials: false});
});

//POST registration page
router.post('/register',(req,res) => {
  const user = new User({
    username: req.body.username
  });

  //use register() rather than save() to create hashed pw
  //and ensure username doesn't already exist
  if (user.isValidPassword(req.body.password)) {
    User.register(user, req.body.password, (err,newUser) => {
      if (err) {
        console.log(err);
        return res.render('register', {invalidCredentials: "taken"});
      }
      passport.authenticate('local')(req,res,() => {
        res.redirect('/pokedex');
      });
    });
  } else {
    res.render('register', {invalidCredentials: "bad"})
  }

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

router.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

//login/register page
router.get('/authenticate', (req,res) => {
  res.render('authenticate');
});

module.exports = router;