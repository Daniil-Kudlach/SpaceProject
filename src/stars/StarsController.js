import {
    StarsModel
} from "./StarsModel.js";
import {
    StarsView
} from "./StarsView.js";

export class StarsController {
    constructor({
        subscribe,
        notify
    }) {
        this.subscribe = subscribe;
        this.notify = notify;
        this.model = new StarsModel();
        this.view = new StarsView();
        this.init();
        this.subscribe('mousemove', this.changeDirection.bind(this));
        this.subscribe('mousedown', this.move.bind(this));
        this.subscribe('mousedown', this.changeDirection.bind(this));
        this.subscribe('mouseup', this.stop.bind(this));
        this.subscribe('mouseleave', this.stop.bind(this));
    }

    move(ev) {
        if(ev.buttons == 1){
            this.model.setMove();
            this.view.go(this.go.bind(this),this.model.move);
        } else {
            return;
        }
    }

    changeDirection(ev) {
        this.model.changeDirection(ev);
    }

    stop() {
        this.model.stop();
        this.view.stop();
    }

    go() {
        // this.model.ticker? this.model.ticker = false : this.model.ticker = true;
        // this.model.ticker ? this.view.clear(this.model.width, this.model.height):0;
        this.view.clear(this.model.width, this.model.height)
        this.model.stars.forEach((el, i) => {
            if (el.x > this.model.width) {
                this.model.replaceStar(i, this.view.drawStar(this.model.getOptions(1, this.model.height)));
            }
            if (el.y > this.model.height) {
                this.model.replaceStar(i, this.view.drawStar(this.model.getOptions(this.model.width, 1)));
            }
            if (el.x < 0) {
                this.model.replaceStar(i, this.view.drawStar(this.model.getOptions(this.model.width, 1, this.model.width - 1, this.model.height)));
            }
            if (el.y < 0) {
                this.model.replaceStar(i, this.view.drawStar(this.model.getOptions(this.model.width, this.model.height, 1, this.model.height - 1)));
            }
            if (this.model.direction.evX > this.model.middle.x) {
                el.x -= this.model.direction.x;
            } else if (this.model.direction.evX < this.model.middle.x) {
                el.x += this.model.direction.x;
            };
            if (this.model.direction.evY > this.model.middle.y) {
                el.y -= this.model.direction.y;
            } else if (this.model.direction.evY < this.model.middle.y) {
                el.y += this.model.direction.y;
            };
            el.draw(this.model.move);
        });
        this.view.go(this.go.bind(this),this.model.move);
    }

    init() {
        this.view.addListeners(this.getListeners());
    }

    resize() {
        this.model.resize(this.view.getSize());
        this.model.getMiddle();
        this.view.clear(this.model.width, this.model.height);
        let count = this.model.getStarCount();
        for (let i = 0; i < count; i++) {
            this.model.addStar(this.view.drawStar(this.model.getOptions()));
            this.model.stars[i].draw();
        }
    }

    getListeners() {
        return {
            resize: this.resize.bind(this)
        }
    }
}