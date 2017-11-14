var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    size: String
   },{
       timestamps : true
    })
mongoose.model('Dog', DogSchema);
var Dog = mongoose.model('Dog'); 



