var mongoose = require('mongoose');
var Text = new mongoose.Schema({
  layer: Number,
  text: String,
  x: Number,
  y: Number,
  color: String,
  fontSize: Number,
  fontFamily: String
})

var Image = new mongoose.Schema({
  layer: Number,
  src: String,
  x: Number,
  y: Number,
  height: Number,
  width: Number
})
var LogoSchema = new mongoose.Schema({
  id: String,
  height: Number,
  width: Number,
  name: String,
  texts: [Text],
  images: [Image],
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logo', LogoSchema);