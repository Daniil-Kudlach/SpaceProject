import { ObjectsGeneratorModel } from "./ObjectsGeneratorModel.js";
import { ObjectsGeneratorView } from "./ObjectsGeneratorView.js";
import { ObjectController } from "./template/ObjectController.js";

export class ObjectsGeneratorController{
    constructor({notify, subscribe}){
        this.notify = notify;
        this.subscribe = subscribe;
        this.view = new ObjectsGeneratorView();
        this.model = new ObjectsGeneratorModel();
    }
}