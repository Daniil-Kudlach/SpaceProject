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
        this.w;
        this.h;
        this.objs = [];
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
        this.subscribe('keydown', this.keydown.bind(this));
    }

    keydown(ev) {
        if (ev.code == 'Space') {
            this.user.child.length > 0 ? this.user.clearChild() : 0;
        }
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
            src: this.src,
            isUser: true,
            notify: this.notify,
            date: new Date().getMilliseconds()
        }
    }

    resize(param) {
        this.w = param.w;
        this.h = param.h;
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
        this.w = param.w;
        this.h = param.h;
        this.m = {
            x: param.w / 2,
            y: param.h / 2,
            w: param.w,
            h: param.h
        }
        this.user = new ObjectTemplate(param.ctx, this.getUserParam(param));
        if (this.objs.length == 0) {
            for (let i = 0; i < 600; i++) {
                let a = new ObjectTemplate(param.ctx, this.getParam(param), i);
                this.objs.push(a);
            }
            this.objs.push(this.user);
        }
    }

    getParam() {
        let m = this.random(1, 3);
        return {
            mass: m,
            src: this.src,
            x: Math.random() > 0.3 ? this.random(1, 1000) * -1 : this.random(1, 3000),
            y: Math.random() > 0.3 ? this.random(1, 1000) * -1 : this.random(1, 3000),
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
            if (!el.orb) {
                el.x < -1100 ? el.x = 3000 : 0;
                el.y < -1100 ? el.y = 3000 : 0;
                el.x > 3100 ? el.x = -1000 : 0;
                el.y > 3100 ? el.y = -1000 : 0;
            }
            if (el.x < -500 || el.y < -500 || el.x > this.w + 500 || el.y > this.h + 500) {
                el.changePosition(ev);
            } else {
                el.draw(ev);
            }
            this.filt(el, i);
        });
    }

    filt(el, i) {
        if (el.collision) {
            return;
        } else {
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
                objA.shadow('red');
                objB.shadow('red');
                if (objA.percent > objB.percent) {
                    objB.isUser ? objA.newPosition(-10000, -10000) : objB.newPosition(-999, -999);
                    objA.addMass(objB.mass);
                    objA.collision = false;
                    objB.collision = false;
                    return;
                } else if (objB.percent > objA.percent) {
                    objA.isUser ? objB.newPosition(-10000, -10000) : objA.newPosition(-10000, -10000);
                    objB.addMass(objA.mass);
                    objA.collision = false;
                    objB.collision = false;
                    return;
                } else {
                    objA.isUser ? 0 : objA.newPosition(-10000, -10000);
                    objB.isUser ? 0 : objB.newPosition(-999, -999);
                    objA.addMass(objB.mass);
                    objA.addMass(objB.mass);
                    objA.collision = false;
                    objB.collision = false;
                    return;
                }
                return;
            } else if (objA.mass > objB.mass) {
                if (objB.isUser) {
                    objB.minusMass(objA.mass);
                    objA.newPosition(-10000, -10000)
                    objA.collision = false;
                    objB.collision = false;
                    return;
                } else {
                    objA.court(objB);
                }
                return;
            } else if (objA.mass < objB.mass) {
                if (objA.isUser) {
                    objA.minusMass(objB.mass);
                    objB.newPosition(-10000, -10000)
                    objA.collision = false;
                    objB.collision = false;
                    return;
                } else {
                    objB.court(objA);
                }
                return;
            } 
        }else {
        return false;
    }

}

random(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min)) + min;
}

}