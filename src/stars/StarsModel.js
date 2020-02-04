export class StarsModel {
    constructor() {
        this.stars = [];
        this.width = 0;
        this.height = 0;
        this.minRadius = 0.5;
        this.maxRadius = 1.9;
        this.colors = ["rgba(255, 255, 255, 0.7)", "rgba(252, 244, 201, 0.7)", "rgba(201, 252, 201, 0.7)", "rgba(201, 236, 252, 0.7)", "rgba(229, 201, 252, 0.7)", "rgba(252, 201, 201, 0.7)", "rgba(252, 201, 241, 0.7)", "rgba(252, 201, 201, 0.7)"]
        this.middle = {};
        this.direction = {};
        this.move = false;
        this.speedDivider = 200;
    }

    setMove() {
        this.move = true;
    }

    stop() {
        this.move = false;
    }

    changeDirection(ev) {
        this.direction.evX = ev.x;
        this.direction.evY = ev.y;
        this.direction.x = Math.abs(ev.x - this.middle.x) / this.speedDivider;
        this.direction.y = Math.abs(ev.y - this.middle.y) / this.speedDivider;
    }
    addStar(star) {
        this.stars.push(star);
    }

    getMiddle() {
        this.middle = {
            x: this.width / 2,
            y: this.height / 2
        };
    }

    replaceStar(i, star) {
        this.stars.splice(i, 1, star);
    }

    getOptions(w = this.width, h = this.height, mw = 1, mh = 1) {
        return {
            x: this.random(mw, w),
            y: this.random(mh, h),
            radius: this.minRadius + Math.random() * (this.maxRadius - this.minRadius),
            color: this.colors[this.random(0, this.colors.length)],
            start: 0,
            end: Math.PI * 2
        }
    }

    getStarCount() {
        return (this.width / 100) * (this.height / 100);
    }

    resize(size) {
        this.stars = [];
        this.width = size.w;
        this.height = size.h;
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}