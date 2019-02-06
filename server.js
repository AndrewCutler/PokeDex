//import libraries
const express = require('express'),
      mongoose = require('mongoose');
      // bodyParser = require('body-parser'),
      // methodOverride = require('method-override');

//import types file
const types = require('./public/types');

//import routes
const pokemonRoutes = require('./routes/pokemon'),
      indexRoutes = require('./routes/index');

//start express app
const app = express();

//use routes
app.use(pokemonRoutes);
app.use(indexRoutes);

//set public directory
app.use(express.static(__dirname + '/public'));

// //use method override
// app.use(methodOverride("_method"));

// //use body parser
// app.use(bodyParser.urlencoded({extended: true}));

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