import { MoveAnimationsModel } from "./MoveAnimationsModel.js";
import { MoveAnimationsView } from "./MoveAnimationsView.js";


export class MoveAnimationsController{
    constructor({subscribe, notify}){
        this.subscribe = subscribe;
        this.notify = notify;
        this.model = new MoveAnimationsModel();
        this.view = new MoveAnimationsView(this.getListeners());
    }

    mousemove(ev){
        this.notify('mousemove', ev);
    }

    mouseup(ev){
        this.notify('mouseup', ev);
    }

    mousedown(ev){
        this.notify('mousedown', ev);
    }

    mouseleave(ev){
        this.notify('mouseleave', ev);
    }

    mouseenter(ev){
        this.notify('mouseenter', ev);
    }

    getListeners(){
        return {
            mousedown:this.mousedown.bind(this),
            mouseup:this.mouseup.bind(this),
            mousemove:this.mousemove.bind(this),
            mouseenter:this.mouseenter.bind(this),
            mouseleave:this.mouseleave.bind(this)
        }
    }
}



// const par = {
//     isDown: false,
//     x: 0,
//     y: 0
// }
// const middle = {
//     x: 0,
//     y: 0
// }

// const p = {
//     x: 0,
//     y: 0
// }

// const pos = {
//     x: 0,
//     y: 0
// }

// let counter = 0;

// let obj = document.querySelector('.obj');
// let obj2 = document.querySelector('.obj2');
// const container = document.querySelector('.cont');
// const planet = document.querySelector('.planet');

// posObj = {
//     x: obj.offsetLeft,
//     y: obj.offsetTop
// }

// posObj2 = {
//     x: obj2.offsetLeft,
//     y: obj2.offsetTop
// }

// let inter = null;
// let div = 190;

// document.body.addEventListener('mousemove', mousemove);
// document.body.addEventListener('mousedown', mousedown);
// document.body.addEventListener('mouseleave', mouseoutBody);
// document.body.addEventListener('mouseenter', mouseenterBody);
// document.body.addEventListener('mouseup', mouseup);

// document.querySelector('.cont').addEventListener('mouseover', (ev) => {
//     if (inter !== null) {
//         clearInterval(inter);
//         inter = null;
//     }
//     document.body.removeEventListener('mousemove', mousemove);
//     document.body.removeEventListener('mousedown', mousedown);
// });

// document.querySelector('.cont').addEventListener('mouseout', (ev) => {
//     if (ev.buttons == 1) {
//         inter = setInterval(go, 50);
//         par.isDown = true;
//     }
//     document.body.addEventListener('mousemove', mousemove);
//     document.body.addEventListener('mousedown', mousedown);
// });

// function mousemove(ev) {
//     if (ev.buttons == 0) {
//         if (inter !== null) {
//             clearInterval(inter);
//             inter = null;
//         }
//         par.isDown = false;
//     };
//     par.x = Math.abs(ev.x - middle.x);
//     par.y = Math.abs(ev.y - middle.y);
//     p.x = ev.x;
//     p.y = ev.y;
// }

// function mouseup(ev) {
//     if (inter !== null) {
//         clearInterval(inter);
//         inter = null;
//     }

//     // if (inter !== null) {
//     //    int = setInterval(()=>{
//     //         div = div + 10;
//     //     }, 100)
//     //     setTimeout(()=>{
//     //         clearInterval(inter);
//     //         clearInterval(int);
//     //         inter = null;
//     //         int = null;
//     //         div = 100;
//     //     }, 1000);
//     // }
// }

// function mousedown(ev) {
//     if (ev.buttons == 1) {
//         middle.y = document.body.offsetHeight / 2;
//         middle.x = document.body.offsetWidth / 2;
//         par.isDown = true;
//         inter = setInterval(go, 50);
//     }
// }

// function mouseoutBody(ev) {
//     if (inter !== null) {
//         clearInterval(inter);
//         inter = null;
//     }
// }

// function mouseenterBody(ev) {
//     if (ev.buttons == 1) {
//         inter = setInterval(go, 50);
//         par.isDown = true;
//     }
// }

// function go() {
//     if (par.isDown) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < arrStars.length; i++) {
//             if (arrStars[i].x > w) {
//                 arrStars.splice(i, 1, new Stars(1, h));
//             }
//             if (arrStars[i].y > h) {
//                 arrStars.splice(i, 1, new Stars(w, 1));
//             }
//             if (arrStars[i].x < 0) {
//                 arrStars.splice(i, 1, new Stars(w, 1, w - 1, h));
//             }
//             if (arrStars[i].y < 0) {
//                 arrStars.splice(i, 1, new Stars(w, h, 1, h - 1));
//             }
//             if (p.x > middle.x) {
//                 arrStars[i].x -= (par.x + 70) / div;
//             } else if (p.x < middle.x) {
//                 arrStars[i].x += (par.x + 70) / div;
//             };
//             if (p.y > middle.y) {
//                 arrStars[i].y -= (par.y + 70) / div;
//             } else if (p.y < middle.y) {
//                 arrStars[i].y += (par.y + 70) / div;
//             };
//             arrStars[i].draw();
//         }
//         if (p.x > middle.x) {
//             posObj.x -= (par.x + 71) / div;
//             posObj2.x -= (par.x + 71) / div;
//         } else if (p.x < middle.x) {
//             posObj.x += (par.x + 71) / div;
//             posObj2.x += (par.x + 71) / div;
//         };
//         if (p.y > middle.y) {
//             posObj.y -= (par.y + 71) / div;
//             posObj2.y -= (par.y + 71) / div;
//         } else if (p.y < middle.y) {
//             posObj.y += (par.y + 71) / div;
//             posObj2.y += (par.y + 71) / div;
//         };
//         obj.style.transform = `translate(${posObj.x}px,${posObj.y}px)`;
//         obj2.style.transform = `translate(${posObj2.x}px,${posObj2.y}px)`;
//     }
// }

// function getRandom(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }