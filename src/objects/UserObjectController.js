import { UserObjectView } from "./UserObjectView.js";
import { UserObjectModel } from "./UserObjectModel.js";


export class UserObjectController{
    constructor(){
        this.view = new UserObjectView();
        this.model = new UserObjectModel();
    }
}