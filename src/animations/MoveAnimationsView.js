export class MoveAnimationsView {
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

    clear(w, h) {
        this.ctx.clearRect(0, 0, w, h);
    }

    getCanvas() {
        return this.ctx;
    }

    go(fnc) {
        if (this.inter) {
            clearTimeout(this.timeout);
            this.timeout = false;
            cancelAnimationFrame(this.inter);
            this.inter = false;
        }
        this.timeout = setTimeout(() => {
            this.inter = requestAnimationFrame(fnc, this.canvas);
        }, 50)
    }

    stop() {
        cancelAnimationFrame(this.inter, this.canvas);
        this.inter = false;
    }

    drawStar(star) {
        star.draw = (layer) => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, star.start, star.end, true);
            this.ctx.fillStyle = star.color;
            this.ctx.shadowColor = star.color;
            this.ctx.shadowBlur = 15;
            this.ctx.fill();
            this.ctx.closePath();
        }
        return star;
    }

    getParam() {
        return {
            w: this.canvas.width = window.innerWidth,
            h: this.canvas.height = window.innerHeight,
            c: this.canvas,
            ctx: this.ctx
        }
    }
}