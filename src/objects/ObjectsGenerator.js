import {
    ObjectTemplate
} from "./template/ObjectTemplate.js";

export class ObjectsGenerator {
    constructor({
        notify,
        subscribe
    }) {
        this.notify = notify;
        this.subscribe = subscribe;
        this.objs = [];
        this.user;
        this.danger = {
            x: 0,
            y: 0,
            fX: 0,
            fY: 0
        }
        this.m = {};
        this.src = [
            'Aster',
            'AsterMid',
            'AsterMidPlus',
            'AsterBig',
            'AsterBigPlus',
            'Planet',
            'LivePlanet',
            'SmallStar',
            'MiddleStar',
            'BigStar',
            'NeytronStar',
            'Supernova'
        ];
        this.subscribe('init', this.init.bind(this));
        this.subscribe('go', this.go.bind(this));
        this.subscribe('changeSize', this.resize.bind(this));
    }

    getUserParam() {
        return {
            mass: 1,
            x: this.m.x,
            y: this.m.y,
            dir: {
                x: 0,
                y: 0
            },
            m: this.m,
            moving: false,
            src:this.src
        }
    }

    resize(param) {
        this.m = {
            x: param.w / 2,
            y: param.h / 2,
            w: param.w,
            h: param.h
        }
        this.danger.x = this.m.x - this.user.img.width;
        this.danger.y = this.m.y - this.user.img.height;
        this.danger.fX = this.m.x + this.user.img.width;
        this.danger.fY = this.m.y + this.user.img.height;
        this.user.x = this.m.x - this.user.img.width / 2;
        this.user.y = this.m.y - this.user.img.height / 2;
        this.objs.forEach((el) => {
            el.changeMiddle(this.m);
        });
    }

    init(param) {
        this.m = {
            x: param.w / 2,
            y: param.h / 2,
            w: param.w,
            h: param.h
        }
        this.user = new ObjectTemplate(param.ctx, this.getUserParam(param));
        this.danger.x = this.m.x - this.user.img.width;
        this.danger.y = this.m.y - this.user.img.height;
        this.danger.fX = this.m.x + this.user.img.width;
        this.danger.fY = this.m.y + this.user.img.height;
        if (this.objs.length == 0) {
            for (let i = 0; i < 100; i++) {
                let a = new ObjectTemplate(param.ctx, this.getParam(param), i);
                this.objs.push(a);
            }
        }
        this.objs.push(this.user);
    }

    getParam(param) {
        let m = this.random(1, 11);
        return {
            mass: m,
            src: this.src,
            x: Math.random() > 0.5 ? this.random(1, 2900) * -1 : this.random(1, 2900),
            y: Math.random() > 0.5 ? this.random(1, 2900) * -1 : this.random(1, 2900),
            dir: {
                x: Math.random() > 0.5 ? Math.random() * -1 : Math.random(),
                y: Math.random() > 0.5 ? Math.random() * -1 : Math.random()
            },
            m: this.m,
            moving: true
        }
    }

    randSrc() {
        if (Math.random() > 0.9) {
            return this.src[0];
        } else {
            return this.src[this.random(1, this.src.length - 1)];
        }
    }

    go(ev) {
        this.objs.forEach((el, i) => {
            el.x < -2999 ? el.x = 2999 : 0;
            el.y < -2999 ? el.y = 2999 : 0;
            el.x > 2999 ? el.x = -2999 : 0;
            el.y > 2999 ? el.y = -2999 : 0;
            if (el.x < -100 || el.y < -100 || el.x > this.m.w + 100 || el.y > this.m.h + 100) {
                el.changePosition(ev);
            } else {
                el.draw(ev);
            }
            this.filt(el, i);
        });
        this.user.draw()
    }

    filt(el, i) {
        this.objs.filter((e, j) => {
            if (i == j) {
                return false;
            } else {
                this.collisionCheck(e, el);
            }
        }).forEach((e) => {
            this.checkSize(e, el);
        });
    }

    collisionCheck(objA, objB) {
        let squareX = Math.pow(Math.abs(objA.x - objB.x), 2);
        let squareY = Math.pow(Math.abs(objA.y - objB.y), 2);
        let hypothenuse = Math.sqrt(squareX + squareY);
        let distance = hypothenuse - objA.halfWidth - objB.halfWidth;
        if (distance <= 2) {
            return true
        } else {
            return false
        }
    }

    checkSize(objA, objB) {
        if (objA.mass > objB.mass) {
            objA.court(objB);
        } else if (objA.mass < objB.mass) {
            objB.court(objA);
        } else if (objA.mass == objB.mass) {
            objA.dir.x * -1;
            objB.dir.y * -1;
            objA.dir.y * -1;
            objB.dir.x * -1;
        }
    }

    random(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}