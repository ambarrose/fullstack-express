const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id :mongoose.Schema.Types.ObjectId,
  title : String,
  description : String,
  image_url:String,
  author: String,
  date: new Date(),
  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = mongoose.model('Project', projectSchema);
