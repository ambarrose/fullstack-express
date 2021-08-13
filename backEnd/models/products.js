const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  //primary key for auto-generated ID
  _id :mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  image_url: String
})
//to link data to index file
module.exports = mongoose.model('Product', productSchema);
