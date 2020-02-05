export class StarsView {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");
        this.inter;
        this.timeout;
        this.requestAnimationFrame = window.requestAnimationFrame || 
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame || 
                                    window.msRequestAnimationFrame;
        this.cancelAnimationFrame = window.cancelAnimationFrame || 
                                    window.mozCancelAnimationFrame;
    }

    addListeners(lsnr) {
        window.addEventListener("DOMContentLoaded", lsnr.resize);
        window.addEventListener("resize", lsnr.resize);
    }

    clear(w, h) {
        this.ctx.clearRect(0, 0, w, h);
    }

    go(fnc) {
        this.timeout = setTimeout(()=>{
            this.inter = requestAnimationFrame(fnc);
        },50);
    }

    stop() {
        cancelAnimationFrame(this.inter);
        clearTimeout(this.timeout);
        this.timeout = false;
        this.inter = false;
    }

    drawStar(star) {
        star.draw = (layer) => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, star.start, star.end, true);
            this.ctx.fillStyle = star.color;
            this.ctx.fill();
            this.ctx.closePath();
        }
        return star;
    }

    getSize() {
        return {
            w: canvas.width = window.innerWidth,
            h: canvas.height = window.innerHeight
        }
    }
}