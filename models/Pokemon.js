const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//pokemon schema
const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true },
  type: {
    type: String,
    required: true},
  image: {
    type: String,
    required: true },
  description: {
    type: String,
    required: true }
});

module.exports = Pokemon = mongoose.model('Pokemon',PokemonSchema);