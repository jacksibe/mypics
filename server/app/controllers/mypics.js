var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),

mongoose = require('mongoose'),
Mypic = mongoose.model('Mypics'),
passportService = require('../../config/passport'),
passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });  
multer = require('multer'),
mkdirp = require('mkdirp');

module.exports = function (app, config) {
     app.use('/api', router);
   
    
router.get('/Mypics/user/:galleryId',  function (req, res, next){
        logger.log('Get Photos in a gallery for' + req.params.galleryId, 'verbose');
        Mypic.find({ galleryId: req.params.galleryId})
        .then(mypics => {
            if (mypics) {
                res.status(200).json(mypics);
            } else {
                res.status(404).json({ message : "No Photos Found"});
            }
        })
            .catch(error => {
                return next(error);

            });
        });
       /*var query = Mypic.find({galleryId:req.params.galleryId})
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
   });*/

/**router.get('/Mypics',  function (req, res, next){
    logger.log('Get user', 'verbose');

    Mypic.find()
               .then(Mypic => {
                   if(Mypic){
                       res.status(200).json(Mypic);
                   } else {
                       res.status(404).json({message: "No user found"});
                   }
               })
               .catch(error => {
                   return next(error);
               });
       });**/

/**router.get('/Mypics/:mypicId',  function (req, res, next){
        logger.log('Get user'+ req.params.mypicId, 'verbose');

        Mypic.findById(req.params.mypicId)
                   .then(Mypic => {
                       if(Mypic){
                           res.status(200).json(Mypic);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });   **/

router.post('/Mypics', function(req, res, next){
        logger.log('Create a Gallery', 'verbose');

       var mypic = new Mypic(req.body);
       mypic.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
     var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.galleryId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." +	fileName[fileName.length - 1]);
        }
      });
      var upload = multer({ storage: storage });
      router.post('/Galleries/upload/:galleryId/:mypicId', upload.any(), function(req, res, next){
        logger.log('Upload file for my gallery ' + req.params.mygalleryId + ' and ' + req.params.userId, 'verbose');
        
        Mypic.findById(req.params.mypicId, function(err, mypic){
        if(err){ 
            return next(err);
        } else {     
            if(req.files){
                //todo.file = {
                    mypic.file = {
                    filename : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }           
            //todo.save()
            mypic.save()
                //.then(todo => {
                    .then(mypic => {
                    res.status(200).json(mypic);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});
router.put('/Mypics/:mypicId',  function (req, res, next){
        logger.log('Update Gallery with id mypicid'+ req.params.mypicId, 'verbose');

        Mypic.findOneAndUpdate({_id: req.params.mypicId},       
           req.body, {new:true, multi:false})
               .then(Mypic => {
                   res.status(200).json(Mypic);
               })
               .catch(error => {
                   return next(error);
               });
       });  

router.delete('/Mypics/:mypicId',  function (req, res, next){
        logger.log('Delete pictures with id mypicid'+ req.params.mypicId, 'verbose');

        Mypic.remove({ _id: req.params.mypicId })
               .then(Mypic => {
                   res.status(200).json({msg: "Picture Deleted"});
               })
               .catch(error => {
                   return next(error);
               });
       });
};