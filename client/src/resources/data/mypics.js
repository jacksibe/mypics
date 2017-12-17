import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
        export class MyPics {
            constructor(data) {
                this.data = data;
                this.MYPIC_SERVICE = 'mypics';
                this.mypicsArray = [];
                this.Gallery_service = 'Galleries';
        
            }




        async savePhoto(mypic) {
            console.log(mypic)
            if (mypic) {
                if (!mypic._id) {
                    let serverResponse = await this.data.post(mypic, this.MYPIC_SERVICE);
                    if (!serverResponse.error) {
                        this.mypicsArray.push(serverResponse);
                    }
                    return serverResponse;
                 } else {
                    let serverResponse = await this.data.put(mypic, this.MYPIC_SERVICE + "/" + mypic._id);
                    if (!serverResponse.error) {
                        // this.updateArray(response);
                    }
                    return serverResponse;
                }
            }
    
    
        }
    
        /*async deleteTodo(id){
            let serverResponse = await this.data.delete(this.TODO_SERVICE + "/" + id);
            if(!serverResponse.error){
                for(let i = 0; i < this.todosArray.length; i++){
                    if(this.todosArray[i]._id === id){
                        this.todosArray.splice(i,1);
                    }
                }
            }
        }*/

        async deleteMypic(id) {
            let serverResponse = await this.data.delete("Mypics" + "/" + id);
            if (!serverResponse.error) {
                for (let i = 0; i < this.mypicsArray.length; i++) {
                    if (this.mypicsArray[i]._id === id) {
                        this.mypicsArray.splice(i, 1);
                    }
                }
            }
        }

  
        /*async uploadFile(files, userId, todoId){
                    let formData = new FormData();
                   files.forEach((item, index) => {
                formData.append("file" + index, item);
                    });
                
                let serverResponse = await this.data.uploadFiles(formData, this.TODO_SERVICE + "/upload/" + userId + "/" + todoId);
                return serverResponse;
            }
            
    }*/


    async uploadFile(files, galleryId, mypicId){
        let formData = new FormData();
        files.forEach((item, index) => {
    formData.append("file" + index, item);
        });
    
    let serverResponse = await this.data.uploadFiles(formData, this.Gallery_service + "/upload/" + galleryId + "/" + mypicId);
    return serverResponse;
}

async getUserMypics(galleryId) {
    let response = await this.data.get("Mypics" + "/user/" + galleryId);
    if (!response.error && !response.message) {
        this.mypicsArray = response;
    }
}

}


    