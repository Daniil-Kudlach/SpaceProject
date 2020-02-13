export class MainMenuModel{
    constructor(){

    }

    init(){

    }

    gameover(){

    }

    changeMass(ev){
        let m = ev / 20;
     return {mass:m * 100, n:100 - m}
    }
}