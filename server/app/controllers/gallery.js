var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),

mongoose = require('mongoose'),
//Todo = mongoose.model('todos'),
Mygallery = mongoose.model('Galleries'),
passportService = require('../../config/passport'),
passport = require('passport');


var requireAuth = passport.authenticate('jwt', { session: false });   

module.exports = function (app, config) {
    app.use('/api', router);
   
    
    
    router.get('/Galleries/user/:userId',  function (req, res, next){
        logger.log('Get pictures for a user', 'verbose');

       //var query = Todo.find({userId: req.params.userId})
       var query = Mygallery.find({UserId:req.params.mygalleryId})
       .sort(req.query.order)
       .exec()
       .then(result => {
      	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No Pictures"});
		}
       })
       .catch(err => {
         return next(err);
       });
   });


   router.get('/Galleries',  function (req, res, next){
    logger.log('Get user', 'verbose');

    Mygallery.find()
               .then(Mygallery => {
                   if(Mygallery){
                       res.status(200).json(Mygallery);
                   } else {
                       res.status(404).json({message: "No user found"});
                   }
               })
               .catch(error => {
                   return next(error);
               });
       });



       router.get('/Galleries/:userId', function (req, res, next){
        logger.log('Getting gallery for user:' + req.params.userId, 'verbose');

        Mygallery.find({userId:req.params.userId})
                   .then(Mygallery => {
                       if(Mygallery){
                           res.status(200).json(Mygallery);
                       } else {
                           res.status(404).json({message: "No Gallery found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });

  
           /*router.post('/todos', function(req, res, next){
        logger.log('Create a ToDo', 'verbose');


       var todo = new Todo(req.body);
       todo.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });*/

     router.post('/Galleries', function(req, res, next){
        logger.log('Create a photo', 'verbose');

       var mygallery = new Mygallery(req.body);
       mygallery.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    /*router.put('/todos/:todoId',  function (req, res, next){
        logger.log('Update Todo with id ToDoid'+ req.params.todoId, 'verbose');

        Todo.findOneAndUpdate({_id: req.params.todoId}, 		
           req.body, {new:true, multi:false})
               .then(Todo => {
                   res.status(200).json(Todo);
               })
               .catch(error => {
                   return next(error);
               });
       }); */
       
       router.put('/Galleries/:mygalleryId',  function (req, res, next){
        logger.log('Update photos with id mygalleryid'+ req.params.mygalleryId, 'verbose');

        Mygallery.findOneAndUpdate({_id: req.params.mygalleryId},       
           req.body, {new:true, multi:false})
               .then(Mygallery => {
                   res.status(200).json(Mygallery);
               })
               .catch(error => {
                   return next(error);
               });
       }); 

    /*router.delete('/todos/:todoId',  function (req, res, next){
        logger.log('Delete ToDo with id ToDoid'+ req.params.todoId, 'verbose');

        Todo.remove({ _id: req.params.todoId })
               .then(Todo => {
                   res.status(200).json({msg: "ToDo Deleted"});
               })
               .catch(error => {
                   return next(error);
               });
       });*/

       router.delete('/Galleries/:mygalleryId',   function (req, res, next){
        logger.log('Delete gallery with id mygalleryid'+ req.params.mygalleryId, 'verbose');

        Mygallery.remove({ _id: req.params.mygalleryId })
               .then(Mygallery => {
                   res.status(200).json({msg: "Gallery Deleted"});
               })
               .catch(error => {
                   return next(error);
               });
       });





//router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
//    logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
    
//    Todo.findById(req.params.todoId, function(err, todo){


 
};