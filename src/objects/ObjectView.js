export class ObjectView{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
    }
    
    init([c,ctx]){
        this.canvas = c;
        this.ctx = ctx;
        this.draw();
    }

    go(){
        
    }


    draw(x,y){
        this.ctx.beginPath();
            this.ctx.arc(100,100,50,0,2*Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
            this.ctx.closePath();
    }
}