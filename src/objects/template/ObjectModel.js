export class ObjectModel{
    constructor(param){
        this.object = {};
    }

    getOptions(name,){    }

    changeDirection(){}

    random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
}