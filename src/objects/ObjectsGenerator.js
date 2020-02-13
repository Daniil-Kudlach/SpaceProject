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
        this.m;
        this.user;
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
            mass: 6,
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
        if (this.objs.length == 0) {
            for (let i = 0; i < 1000; i++) {
                let a = new ObjectTemplate(param.ctx, this.getParam(param), i);
                this.objs.push(a);
            }
        }
        this.objs.push(this.user);
    }

    getParam() {
        let m = this.random(1, 5);
        return {
            mass: m,
            src: this.src,
            x: Math.random() > 0.5 ? this.random(1, 3000) * -1 : this.random(1, 3000),
            y: Math.random() > 0.5 ? this.random(1, 3000) * -1 : this.random(1, 3000),
            dir: {
                x: Math.random() > 0.5 ? Math.random() * -1 : Math.random() * 1,
                y: Math.random() > 0.5 ? Math.random() * -1 : Math.random() * 1
            },
            m: this.m,
            moving: true
        }
    }

    go(ev) {
        this.objs.forEach((el, i) => {
            if(!el.orb){
                el.x < -4999 ? el.x = 4000 : 0;
                el.y < -4999 ? el.y = 4000 : 0;
                el.x > 4999 ? el.x = -4000 : 0;
                el.y > 4999 ? el.y = -4000 : 0;
            }
            el.draw(ev);
            this.filt(el, i);
        });
    }

    filt(el, i) {
        if(el.collision){
            return;
        }else{
            this.objs.forEach((e, j) => {
                if (i == j || e.collision) {
                    return;
                } else {
                    this.collisionCheck(e, el);
                }
            });
        }
    }

    collisionCheck(objA, objB) {
        let squareX = Math.pow(Math.abs(objA.x - objB.x), 2);
        let squareY = Math.pow(Math.abs(objA.y - objB.y), 2);
        let hypothenuse = Math.sqrt(squareX + squareY);
        let distance = hypothenuse - objA.halfWidth - objB.halfWidth;
        if (distance <= 0) {
            objA.collision = true;
            objB.collision = true;
            if (objA.mass == objB.mass) {
                objA.minusMass(objB.mass);
                objB.minusMass(objA.mass);
                objA.shadow('orange');
                objB.shadow('orange');
                objA !== this.user? objA.newPosition(-10000):0;
                objB !== this.user? objB.newPosition(-10000):0;
                objA.collision = false;
                objB.collision = false;
                return;
            }else if (objA.mass > objB.mass) {
                objB == this.user?objB.minusMass(objA.mass):objA.court(objB);
                return;
            } else if (objA.mass < objB.mass) {
                objA == this.user?objA.minusMass(objB.mass):objB.court(objA);
                return;
            }  
            return true
        } else {
            return false
        }
    }

    random(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}