export class MoveAnimationsView{
    constructor(lsnr){
        this.b = document.body;
        this.container = document.querySelector('.cont');
        this.lsnr = lsnr;
        this.addListener();
    }

    addListener(){
        this.aLis(this.b,'mousemove',this.lsnr.mousemove);
        this.aLis(this.b,'mousedown',this.lsnr.mousedown);
        this.aLis(this.b,'mouseleave',this.lsnr.mouseleave);
        this.aLis(this.b,'mouseenter',this.lsnr.mouseenter);
        this.aLis(this.b,'mouseup',this.lsnr.mouseup);
    }

    aLis(el,ev,lsnr){
        el.addEventListener(ev,lsnr);
    }
}