import {
    EventsProcessingView
} from "./EventsProcessingView.js";

export class EventsProcessingController {
    constructor({
        subscribe,
        notify
    }) {
        this.subscribe = subscribe;
        this.notify = notify;
        this.view = new EventsProcessingView(this.getListeners());
    }

    mousemove(ev) {
        this.notify('mousemove', ev);
    }

    mouseup(ev) {
        this.notify('mouseup', ev);
    }

    mousedown(ev) {
        this.notify('mousedown', ev);
    }

    mouseleave(ev) {
        this.notify('mouseleave', ev);
    }

    mouseenter(ev) {
        this.notify('mouseenter', ev);
    }

    load(ev) {
        this.notify('load', ev);
    }

    resize(ev) {
        this.notify('resize', ev);
    }

    getListeners() {
        return {
            mousedown: this.mousedown.bind(this),
            mouseup: this.mouseup.bind(this),
            mousemove: this.mousemove.bind(this),
            mouseenter: this.mouseenter.bind(this),
            mouseleave: this.mouseleave.bind(this),
            load: this.load.bind(this),
            resize: this.resize.bind(this)
        }
    }
}