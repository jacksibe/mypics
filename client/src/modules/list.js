import {inject} from 'aurelia-framework'; 
import {MyPics} from '../resources/data/mypics';
import {Mygallery} from '../resources/data/gallery';  
import {Router} from 'aurelia-router';
import { AuthService } from 'aurelia-auth';    



    @inject(Router, Mygallery, MyPics, AuthService)
    export class List {
      constructor(router, mygallery, mypics, auth) {
      this.mypics = mypics;
      this.router = router;
      this.mygallery = mygallery;
      this.message = 'home';
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showing = "mypicList";
      this.getgallery = JSON.parse(sessionStorage.getItem('mygallery'));


 }

 async activate() {
    await this.mygallery.getUserMygallery(this.user._id);
  }

          
  async showPhotos(mygallery){
    sessionStorage.setItem("mygallery", JSON.stringify(mygallery));
    await this.mypics.getUserMypics(JSON.parse(sessionStorage.getItem('mygallery'))._id);
    this.showing = "photoList";
      }
      

createGallery(){	
    this.myGalleryObj = {
        gallery: "",
  description: "",
        userId: this.user._id,
    
    }
    this.showing = 'mypicForm';		     
    }


    
    createPhotos(){	
		this.mypicObj = {
            galleryId: this.getgallery._id
        }
		this.showing = 'photoForm';		
  }


    async saveGallery(){
		if(this.myGalleryObj){		
			let response = await this.mygallery.save(this.myGalleryObj);
			if(response.error){
				alert("There was an error creating the Gallery");
			} else {
				
                        }
          
			}
			this.showing = "mypicList";
		}
  

        editMyGallery(mygallery) {
            this.myGalleryObj = mygallery;
            this.showing = 'mypicForm';
        } 

    editPhotos(mypics){
             this.mypicObj = mypics;
              this.showing = 'photoForm';	
    }

       deleteMyGallery(mygallery){
              this.mygallery.deleteMypic(mygallery._id);
          }

      deletePhotos(mypics){
                this.mypics.deleteMypic(mypics._id);
            }
      
      back(){
        this.showing = "mypicList";
    }

    backToMyGallery(){
        this.showing = "mypicList";
    }

    backPhotos(){
      this.showing = "photoList";
  }
        

        changeFiles(){
        this.filesToUpload = new Array(); 
        this.filesToUpload.push(this.files[0]);
            }
        removeFile(index){
        this.filesToUpload.splice(index,1);
            }
                        
        async savePhotos(){
                if(this.mypicObj){		
                    let response = await this.mypics.savePhoto(this.mypicObj);
                    if(response.error){
                        alert("There was an error creating the Mypic");
                    } else {
                            var mypicId = response._id;
                            var galleryId = response.galleryId;
                                if(this.filesToUpload && this.filesToUpload.length){
                                    await this.mypics.uploadFile(this.filesToUpload, galleryId, mypicId);
                                    this.filesToUpload = [];
                                }
                  
                    }
                    this.showing = "photoList";
                }
          }

 

  logout(){
     sessionStorage.removeItem('user');
     this.auth.logout();

  }
}

