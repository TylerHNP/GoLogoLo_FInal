var mongoose = require('mongoose');
var Text = new mongoose.Schema({
  text: String,
  left: Number,
  top: Number,
  color: String,
  fontSize: Number,
  backGroundColor: String,
  borderColor: String,
  borderRadius: Number,
  borderWidth: Number,
  padding: Number,
  margin: Number
})

var Image = new mongoose.Schema({
  src: String,
  left: Number,
  top: Number,
  height: Number,
  width: Number
})
var LogoSchema = new mongoose.Schema({
  id: String,
  name: String,
  texts: [Text],
  images: [Image],
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logo', LogoSchema);