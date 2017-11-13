var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/dogs');
var DogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    size: String
   },{
       timestamps : true
   })
mongoose.model('Dog', DogSchema); 
var Dog = mongoose.model('Dog') 

app.get('/', function(req, res) {
    Dog.find({},function(err, dogs){
        if(err){
            console.log('something went wrong');
        }
        else{
            console.log('successfully displayed all the quotes!');
            res.render('index', {dogs : dogs});  
        }    
    })
})

app.get('/dogs/new', function(req, res){
    res.render('add');
})

app.get('/dogs/edit/:id', function(req,res){
    Dog.findOne({_id:req.params.id},function(err, dogs){
       if(err){
        console.log('something went wrong');
        }
        else{
            console.log('edit dog page....');
            res.render('edit', {dogs:dogs});  
        }    
    })
})
app.post('/process', function(req, res) {
    console.log("POST DATA", req.body);
    var dog = new Dog({name : req.body.name, breed: req.body.breed, size: req.body.size});
    dog.save(function(err){
        if(err) {
            console.log('something went wrong');
        } 
        else { 
            console.log('successfully added info!');
            res.redirect('/');
        }
    })
})
app.post('/dogs/:id',function(req,res){
    Dog.update({_id:req.params.id},{$set:{name:req.body.name, breed:req.body.breed, size: req.body.size}},function(err,dogs){
        if(err){
            console.log('something went wrong');
        }
        else{
            console.log('Updated dog info....');
            res.redirect('/'); 
        }    
    })
})
app.get('/dogs/destroy/:id', function(req,res){
    Dog.remove({_id:req.params.id},function(err,dogs){
        if(err){
            console.log('something went wrong');
        }
        else{
            console.log('Deleted dog info....');
            res.redirect('/'); 
        }    
    })
})


app.listen(8000, function() {
    console.log("listening on port 8000");
})