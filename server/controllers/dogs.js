var mongoose = require('mongoose');
var Dog = mongoose.model('Dog');

module.exports = {
    show: function(req, res){
        Dog.find({},function(err, dogs){
            if(err){
                console.log('something went wrong');
            }
            else{
                console.log('successfully displayed all the quotes!');
                res.render('index', {dogs : dogs});  
            }    
        })
    },

    create: function(req,res){
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
    },

    update: function(req,res){
        Dog.update({_id:req.params.id},{$set:{name:req.body.name, breed:req.body.breed, size: req.body.size}},function(err,dogs){
            if(err){
                console.log('something went wrong');
            }
            else{
                console.log('Updated dog info....');
                res.redirect('/'); 
            }    
        })
    },

    delete: function(req, res){
        Dog.remove({_id:req.params.id},function(err,dogs){
            if(err){
                console.log('something went wrong');
            }
            else{
                console.log('Deleted dog info....');
                res.redirect('/'); 
            }    
        })
    },

    edit: function(req, res){
        Dog.findOne({_id:req.params.id},function(err, dogs){
            if(err){
             console.log('something went wrong');
             }
             else{
                 console.log('edit dog page....');
                 res.render('edit', {dogs:dogs});  
             }    
         })
    }
}