export class StarsModel{
    constructor() {
        this.stars = [];
        this.minRadius = 0.4;
        this.maxRadius = 1.9;
        this.colors = ["rgba(255, 255, 255, 0.7)", "rgba(252, 244, 201, 0.7)", "rgba(201, 252, 201, 0.7)", "rgba(201, 236, 252, 0.7)", "rgba(229, 201, 252, 0.7)", "rgba(252, 201, 201, 0.7)", "rgba(252, 201, 241, 0.7)", "rgba(252, 201, 201, 0.7)"];
        this.frequence = 150; 
        this.end = Math.PI * 2;
    }

    go(el,par){
        if (el.x > par.w) {
            return this.getOptions(1, par.h);
        }
        if (el.y > par.h) {
            return this.getOptions(par.w, 1);
        }
        if (el.x < 0) {
            return this.getOptions(par.w, 1, par.w - 1, par.h);
        }
        if (el.y < 0) {
            return this.getOptions(par.w, par.h, 1, par.h - 1);
        }
        if (par.dir.evX > par.m.x) {
            el.x -= par.dir.x * el.radius / par.div;
        } else if (par.dir.evX < par.m.x) {
            el.x += par.dir.x * el.radius / par.div;
        }
        if (par.dir.evY > par.m.y) {
            el.y -= par.dir.y * el.radius / par.div;
        } else if (par.dir.evY < par.m.y) {
            el.y += par.dir.y * el.radius / par.div;
        }
    }

    addStar(star) {
        this.stars.push(star);
    }

    replaceStar(i, star) {
        this.stars.splice(i, 1, star);
    }

    getStarCount(w,h) {
        return (w / this.frequence) * (h / this.frequence);
    }

    getOptions(w, h, mw = 1, mh = 1) {
        return {
            x: this.random(mw, w),
            y: this.random(mh, h),
            radius: this.minRadius + Math.random() * (this.maxRadius - this.minRadius),
            color: this.colors[this.random(0, this.colors.length)],
            start: 0,
            end: this.end
        }
    }

    resize() {
        this.stars = [];
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}