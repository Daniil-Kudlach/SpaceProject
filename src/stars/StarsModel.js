export class StarsModel {
    constructor() {
        this.stars = [];
        this.width = 0;
        this.height = 0;
        this.minRadius = 0.4;
        this.maxRadius = 1.9;
        this.colors = ["rgba(255, 255, 255, 0.7)", "rgba(252, 244, 201, 0.7)", "rgba(201, 252, 201, 0.7)", "rgba(201, 236, 252, 0.7)", "rgba(229, 201, 252, 0.7)", "rgba(252, 201, 201, 0.7)", "rgba(252, 201, 241, 0.7)", "rgba(252, 201, 201, 0.7)"]
        this.middle = {};
        this.direction = {};
        this.move = false;
        this.speedDivider = 190;
        this.frequence = 150; 
    }

    setMove() {
        this.move = true;
        this.speedDivider = 190;
    }

    stop() {
        this.move = false;
    }

    easeOut(){
        !this.move?this.speedDivider +=1:0;
    }

    go(el){
        if (el.x > this.width) {
            return this.getOptions(1, this.height);
        }
        if (el.y > this.height) {
            return this.getOptions(this.width, 1);
        }
        if (el.x < 0) {
            return this.getOptions(this.width, 1, this.width - 1, this.height);
        }
        if (el.y < 0) {
            return this.getOptions(this.width, this.height, 1, this.height - 1);
        }
        if (this.direction.evX > this.middle.x) {
            el.x -= this.direction.x * el.radius / this.speedDivider;
        } else if (this.direction.evX < this.middle.x) {
            el.x += this.direction.x * el.radius / this.speedDivider;
        }
        if (this.direction.evY > this.middle.y) {
            el.y -= this.direction.y * el.radius / this.speedDivider;
        } else if (this.direction.evY < this.middle.y) {
            el.y += this.direction.y * el.radius / this.speedDivider;
        }
    }

    getSpeed(){
        return [this.direction,this.speedDivider];
    }

    changeDirection(ev) {
        if(this.move){
            this.direction.evX = ev.x;
            this.direction.evY = ev.y;
            this.direction.x = Math.abs(ev.x - this.middle.x);
            this.direction.y = Math.abs(ev.y - this.middle.y);
            return this.direction;
        }else{
            return false;
        }
    }

    addStar(star) {
        this.stars.push(star);
    }

    replaceStar(i, star) {
        this.stars.splice(i, 1, star);
    }

    getStarCount() {
        return (this.width / this.frequence) * (this.height / this.frequence);
    }

    getMiddle() {
        this.middle = {
            x: this.width / 2,
            y: this.height / 2
        };
    }

    getOptions(w = this.width, h = this.height, mw = 1, mh = 1) {
        return {
            x: this.random(mw, w),
            y: this.random(mh, h),
            radius: this.minRadius + Math.random() * (this.maxRadius - this.minRadius),
            color: this.colors[this.random(0, this.colors.length)],
            start: 0,
            end: (Math.PI * 2),
            xGo:0,
            yGo:0
        }
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