import { MainMenuView } from "./MainMenuView.js";
import { MainMenuModel } from "./MainMenuModel.js";

export class MainMenuController{
    constructor({subscribe, notify}){
        this.subscribe = subscribe;
        this.notify = notify;
        this.subscribe('load', this.init.bind(this));
        this.subscribe('gameover', this.gameover.bind(this));
        this.subscribe('changeMass', this.changeMass.bind(this));
        this.view = new MainMenuView(this.getListeners());
        this.model = new MainMenuModel();
    }

    init(){
        this.view.init();
        this.model.init();
    }

    changeMass(ev){
        this.view.changeMass(this.model.changeMass(ev));
    }

    gameover(){
        this.view.gameover();
        this.model.gameover();
    }

    click(ev){
        console.log(ev);
        this.notify(ev.target.classList[1], ev);
        this.view.startGame();
    }

    getListeners(){
        return {
            click:this.click.bind(this)
        }
    }


}