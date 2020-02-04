export class StarsView {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");
        this.inter = null;
        this.rAF();
    }

    addListeners(lsnr) {
        window.addEventListener("DOMContentLoaded", lsnr.resize);
        window.addEventListener("resize", lsnr.resize);
    }

    clear(w, h) {
        this.ctx.clearRect(0, 0, w, h);
    }

    go(fnc, move) {
        if (move) {
            window.requestAnimationFrame(fnc);
        }
    }

    rAF() {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = ( function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        });
    }
    }

    stop() {
        clearInterval(this.inter);
        this.inter = null;
    }

    drawStar(star) {
        star.draw = (layer) => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, star.start, star.end);
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