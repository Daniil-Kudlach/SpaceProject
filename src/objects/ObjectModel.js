export class ObjectModel{
    constructor(){
        this.src;
        this.speed = {min:1,max:10};
    }

    setSrc(src){
        this.src = src;
    }

    getOptions(){
        return {
            src:this.src,
            speed:this.speed,

        }
    }

    random(){

    }
}