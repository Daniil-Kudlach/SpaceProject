import { ObjectView } from "./ObjectView.js";
import { ObjectModel } from "./ObjectModel.js";


export class ObjectController{
    constructor({notify, subscribe}){
        this.notify = notify;
        this.subscribe = subscribe;
        this.view = new ObjectView();
        this.model = new ObjectModel();
        this.subscribe('changeDirection', this.changeDirection.bind(this));
    }

    changeDirection(ev){
        console.log(ev);
    }

}