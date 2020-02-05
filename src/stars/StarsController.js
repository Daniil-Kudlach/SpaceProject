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

    go(time) {
        this.view.go(this.go.bind(this),this.model.move);
        this.view.clear(this.model.width, this.model.height);
        this.model.stars.forEach((el, i) => {
            let replace = this.model.go(el,time);
            replace? this.model.replaceStar(i, this.view.drawStar(replace)):0;
            el.draw();
        });
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