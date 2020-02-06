import { UserObjectView } from "./UserObjectView.js";
import { UserObjectModel } from "./UserObjectModel.js";


export class UserObjectController{
    constructor({notify, subscribe}){
        this.notify = notify;
        this.subscribe = subscribe;
        this.view = new UserObjectView();
        this.model = new UserObjectModel();
    }

    changeDirection(ev){
        
    }

}