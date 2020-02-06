import { ObjectView } from "./ObjectView.js";
import { ObjectModel } from "./ObjectModel.js";


export class ObjectController{
    constructor({notify, subscribe}){
        this.notify = notify;
        this.subscribe = subscribe;
        this.view = new ObjectView();
        this.model = new ObjectModel();
        this.subscribe('changeDirection', this.changeDirection.bind(this));
        this.subscribe('go', this.go.bind(this));
        this.subscribe('init', this.init.bind(this))

    }

    changeDirection(ev){
        this.model.changeDirection();
    }

    go(ev){
        this.view.go();
    }

    init(ev){
        this.view.init(ev);
    }

}