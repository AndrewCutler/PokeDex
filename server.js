//import libraries
const express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      session = require('express-session');

//import routes
const pokemonRoutes = require('./routes/pokemon'),
      indexRoutes = require('./routes/index');

//start express app
const app = express();

//use routes
app.use(pokemonRoutes);
app.use(indexRoutes);

//initialize passport and session
app.use(express.session({ secret: 'elissa' }));
app.use(passport.initialize());
app.use(passport.session());

//set up local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//set public directory
app.use(express.static(__dirname + '/public'));

//connect mongoose to mongo
mongoose
  .connect('mongodb://localhost:27017/pokedex', {useNewUrlParser: true})
  .then(console.log('connected to MongoDB'))
  .catch(err => console.log(err));

//set view engine
app.set('view engine', 'ejs');


port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));

// TODO:
// organize pokedex index page
// add confirmation button for delete
// show weaknesses/strengths
// clean up route names
// implement authorization