import Resource from 'resource'

class UserResource extends Resource {

    static $BASE_URL = process.env.DATABASE_URL;
    static $key = "users";
    static $model = ["id", "name", "password"];
  
    // Additional methods specific to UserResource can be added here
    /**
     * Fetch user by email
     * @param {string} email User email
     * @returns {Promise<any>}
     */
    static getByEmail(email) {
      return this._handler(
        fetch(`${this.BASE_URL}/${this.route}?email=${encodeURIComponent(email)}`, {
          method: "GET",
        })
      );
    }
  
    /**
     * Fetch all users
     * @returns {Promise<any>}
     */
    static getAll() {
      return this._handler(
        fetch(`${this.BASE_URL}/${this.route}`, {
          method: "GET",
        })
      );
    }

    static model(){
      return super.model(...arguments)
    }

    static get(dataAttributes){
      return super.get(...arguments)
    }

    static update(){
      return super.upsert(...arguments)
    }

    static insert(){
      return super.upsert(...arguments)
    }

    static find(){
      return super.find(...arguments)
    }

    static delete(){
      return super.delete(...arguments)
    }
  }
  
  export default UserResource;