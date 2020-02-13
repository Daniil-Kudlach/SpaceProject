export class ObjectTemplate {
    constructor(ctx, param) {
        this.type = param.src[param.mass - 1];
        this.src = param.src;
        this.isUser = param.isUser || false;
        this.notify = param.notify || false;
        this.mass = param.mass;
        this.percent = 0;
        this.collision = false;
        this.child = [];
        this.parent;
        this.m = param.m;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = `../../../img/${this.type}.png`;
        this.dir = {
            x: param.dir.x,
            y: param.dir.y
        };
        this.orb = false;
        this.moving = param.moving;
        this.degree = 1;
        this.speed = 2.9;
        this.blur = false;
        this.PI = Math.PI * 2;
        this.rotationSpeed = Math.random() > 0.5 ? -Math.sqrt(Math.random() * 2) * Math.PI / 360 : Math.sqrt(Math.random() * 2) * Math.PI / 360;
        this.x = param.x;
        this.y = param.y;
        this.center = {};
        this.img.onload = () => {
            this.loadImg();
        }
    }

    loadImg() {
        this.halfWidth = this.img.width / 2;
        this.center = {
            x: this.x,
            y: this.y
        };
        this.draw();
    }

    draw(par) {
        if (par && !this.collision && !this.orb) {
            this.moving ? this.changePosition(par) : 0;
            this.ctx.save();
            this.ctx.drawImage(this.img, this.x - this.halfWidth, this.y - this.halfWidth, this.img.width, this.img.width);
            this.ctx.restore();
            if (this.child.length !== 0) {
                this.child.length >= 5 ? this.eat(this.child[0]) : 0;
            }
        } else if (this.orb && this.moving) {
            this.ctx.save();
            this.ctx.translate(this.parent.x, this.parent.y); //вращение вокруг центра
            this.ctx.rotate((this.degree += this.rotationSpeed));
            this.ctx.drawImage(this.img, this.orb - this.halfWidth, this.orb - this.halfWidth, this.img.width, this.img.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.orb, this.orb);
            this.ctx.arc(this.orb, this.orb, this.halfWidth, 0, this.PI);
            this.ctx.moveTo(this.orb, this.orb);
            this.ctx.lineTo(0, 0)
            this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            this.degree == 360 ? this.degree = 0 : 0;
        }
    }

    court(obj) {
        if (this.mass <= 5) {
            this.addMass(obj.mass);
            obj.newPosition(-10000, -10000);
            this.collision = false;
            this.shadow('orange');
        } else if (this.mass <= 7 && this.mass > 5) {
            if (obj.mass <= 5) {
                obj.orbit(this);
                this.addChild(obj);
                this.shadow('orange');
            } else {
                obj.dir.x = this.dir.x;
                obj.dir.y = this.dir.y;
            }
            this.collision = false;
        } else if (this.mass <= 11 && this.mass > 7) {
            if (obj.mass > 5) {
                obj.orbit(this);
                this.addChild(obj);
                this.shadow('orange');
            } else {
                this.minusMass(obj.mass);
                obj.newPosition(-10000, -10000);
                this.shadow('orange');
            }
            this.collision = false;
        }
    }

    shadow(color) {
        this.ctx.save();
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = color;
        this.ctx.drawImage(this.img, this.x - this.halfWidth, this.y - this.halfWidth, this.img.width, this.img.width);
        this.ctx.restore();
        this.blur = false;
        return;
    }

    clearChild() {
        this.child.forEach(e => this.eat(e));
    }

    evolution(type) {
        this.type = this.src[type];
        this.img = new Image();
        this.img.src = `../../../img/${this.type}.png`;
        this.img.onload = () => {
            this.loadImg();
            if (this.child.length > 0) {
                this.clearChild();
            }
        }
        this.blur = true;
        return;
    }

    minusMass(m) {
        this.percent -= m;
        this.isUser?this.notify('changeMass',this.percent):0;
        if (this.percent <= 0) {
            this.mass -= 1;
            this.checkMass();
            this.percent = 0;
        }
        return;
    }

    addMass(m) {
        this.isUser?this.notify('changeMass',this.percent):0;
        this.percent += m/ this.mass;
        if (this.percent >= 20) {
            this.mass += 1;
            this.checkMass();
            this.percent = 0;
        }
        return;
    }

    checkMass() {
        if (this.mass <= 0) {
            if (this.isUser) {
                this.isUser ? console.log('gameover') : 0;
                this.notify('gameover', this);
            } else {
                this.newPosition(-10000, -10000);
            }
        } else if (this.mass == 1) {
            this.evolution(0);
            this.shadow('green');
            return;
        } else if (this.mass == 2) {
            this.evolution(1);
            this.shadow('green');
            return;
        } else if (this.mass == 3) {
            this.evolution(2);
            this.shadow('green');
            return;
        } else if (this.mass == 4) {
            this.evolution(3);
            this.shadow('green');
            return;
        } else if (this.mass == 5) {
            this.evolution(4);
            this.shadow('green');
            return;
        } else if (this.mass == 6) {
            this.evolution(5);
            this.shadow('green');
            return;
        } else if (this.mass == 7) {
            this.evolution(6);
            this.shadow('green');
            return;
        } else if (this.mass == 8) {
            this.evolution(7);
            this.shadow('green');
            return;
        } else if (this.mass == 9) {
            this.evolution(8);
            this.shadow('green');
            return;
        } else if (this.mass == 10) {
            this.evolution(9);
            this.shadow('green');
            return;
        } else if (this.mass == 11) {
            this.evolution(10);
            this.shadow('green');
            return;
        } else if (this.mass > 11) {
            console.log(this, this.mass);
            this.blackHole();
            return;
        }
    }

    addChild(child) {
        this.child.push(child);
        this.blur = true;
        return;
    }

    orbit(parent) {
        this.orb = this.img.width * 3 - this.rotationSpeed;
        this.child.length > 0 ? this.clearChild() : 0;
        this.parent = parent;
        return;
    }

    newPosition(x, y) {
        if (this.child.length > 0) {
            this.clearChild();
        }
        this.x = x;
        this.y = y;
        this.draw();
        return;
    }

    changePosition(par) {
        if (this.moving && !this.orb) {
            this.x -= par.dir.x * (this.speed / par.div) + this.dir.x;
            this.y -= par.dir.y * (this.speed / par.div) + this.dir.y;
            this.center.x = this.halfWidth + this.x;
            this.center.y = this.halfWidth + this.y;
        }
        return;
    }

    rmwChild(c) {
        this.child.splice(this.child.indexOf(c), 1);
        return;
    }

    eat(child) {
        child.orb = false;
        this.addMass(child.mass);
        child.newPosition(Math.random() * 10000, Math.random() * 10000);
        this.rmwChild(child);
        return;
    }

    changeMiddle(m) {
        this.m = m;
        return;
    }

}