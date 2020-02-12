export class ObjectTemplate {
    constructor(ctx, param) {
        this.type = param.src[param.mass - 1];
        this.mass = param.mass;
        this.child = [];
        this.m = param.m;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = `../../../img/${param.type}.png`;
        this.img.onload = () => {
            this.draw();
            this.halfWidth = this.img.width / 2;
        }
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
        this.rotationSpeed = Math.random() > 0.5 ? -Math.sqrt(Math.random() * 10) : Math.sqrt(Math.random() * 10) * Math.PI / 360;
        this.x = param.x - this.img.width / 2;
        this.y = param.y - this.img.height / 2;
        this.center = {
            x: this.halfWidth + this.x,
            y: this.halfWidth + this.y
        };
    }

    draw(par) {
        if (par && this.moving) {
            this.changePosition(par);
        }
        if (!this.blur) {
            this.ctx.save();
            this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.width);
            this.ctx.restore();
        } else {
            this.ctx.save();
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = 'white';
            this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.width);
            this.ctx.restore();
            this.blur = false;
        }
    }

    court(obj) {
        console.log(this);
        if (this.mass <= 5) {
            this.addMass(obj.mass);
            obj.newPosition(Math.random() * 10000, Math.random() * 10000);
        } else if (this.mass <= 7 && this.mass > 5) {
            if (obj.mass <= 5) {
                obj.orbit();
                this.addChild(obj);
            } else {
                obj.dir.x = this.dir.x;
                obj.dir.y = this.dir.y;
            }
        } else if (this.mass <= 11 && this.mass > 7) {
            if (obj.mass <= 5) {
                this.addChild(obj.orbit());
            } else {
                this.addMass(obj.mass);
                obj.newPosition(Math.random() * 10000, Math.random() * 10000);
            }
        }
    }

    evolution(type) {
        this.type = param.src[mass];
        this.img.src = `../../../img/${this.type}.png`;
    }

    addMass(mass) {
        this.mass == mass / 10;
        switch (this.mass) {
            case 2:
                this.evolution(1);
                break;
            case 3:
                this.evolution(2);
                break;
            case 4:
                this.evolution(3);
                break;
            case 5:
                this.evolution(4);
                break;
            case 6:
                this.evolution(5);
                break;
            case 7:
                this.evolution(6);
                break;
            case 8:
                this.evolution(7);
                break;
            case 9:
                this.evolution(8);
                break;
            case 10:
                this.evolution(9);
                break;
            case 11:
                this.evolution(10);
                break;
        }
        this.blur = true;
    }

    addChild(child) {
        this.child.push(child);
    }

    orbit() {
        this.orb = true;
    }

    OrbitMove(par) {
        if (this.orb) {
            this.ctx.save();
            this.ctx.translate(par.x, par.y); //вращение вокруг центра
            this.ctx.rotate((this.degree += this.rotationSpeed));
            this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(this.x + this.halfWidth, this.y + this.halfWidth);
            this.ctx.arc(this.x + this.halfWidth, this.y + this.halfWidth, this.halfWidth, 0, this.PI);
            this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            this.degree == 360 ? this.degree = 0 : 0;
        }
    }

    newPosition(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }

    changePosition(par) {
        this.x -= par.dir.x * (this.speed / par.div) + this.dir.x;
        this.y -= par.dir.y * (this.speed / par.div) + this.dir.y;
        if (this.child.length !== 0) {
            this.child.forEach(el => el.orbitMove({
                x: this.x,
                y: this.y
            }));
        }
        this.center.x = this.halfWidth + this.y;
        this.center.y = this.halfWidth + this.y;
    }

    changeMiddle(m) {
        this.m = m;
    }

}