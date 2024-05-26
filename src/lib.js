export class ServiceDirectory {
    directory = {
        "auth_service": "https://auth.anywebapp.net/"
    }
    constructor(){
        
    }

    getUrl(id){
        return this.directory[id]
    }
}