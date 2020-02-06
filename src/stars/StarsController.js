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
        this.subscribe('load', this.init.bind(this));
        this.subscribe('resize', this.init.bind(this));
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
        this.getDirection(this.model.changeDirection(ev));
    }

    getDirection(direction){
        direction?this.notify('changeDirection', direction):0;
    }

    stop() {
        this.model.stop();
        this.view.stop();
    }

    go(time) {
        this.view.clear(this.model.width, this.model.height);
        this.model.getSpeed();
        this.model.stars.forEach((el, i) => {
            let replace = this.model.go(el);
            replace? this.model.replaceStar(i, this.view.drawStar(replace)):0;
            el.draw();
        });
        this.model.easeOut();
        this.view.go(this.go.bind(this));
    }

    init() {        
        this.model.resize(this.view.getSize());
        this.model.getMiddle();
        this.view.clear(this.model.width, this.model.height);
        let count = this.model.getStarCount();
        for (let i = 0; i < count; i++) {
            this.model.addStar(this.view.drawStar(this.model.getOptions()));
            this.model.stars[i].draw();
        }
    }
}