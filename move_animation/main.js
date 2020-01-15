const par = {
    isDown: false,
    x: 0,
    y: 0
}
const middle = {
    x:0,
    y:0
}

const pos = {
    x:0,
    y:0
}

let inter = null;

document.body.addEventListener('mousemove', mousemove);
document.body.addEventListener('mousedown', mousedown);
document.body.addEventListener('mouseleave', mouseoutBody);
document.body.addEventListener('mouseenter', mouseenterBody);
document.body.addEventListener('mouseup', mouseup);

document.querySelector('.cont').addEventListener('mouseover', (ev) => {
    if (inter !== null) {
        clearInterval(inter);
        inter = null;
    }
    document.body.removeEventListener('mousemove', mousemove);
    document.body.removeEventListener('mousedown', mousedown);
});

document.querySelector('.cont').addEventListener('mouseout', (ev) => {
    if (ev.buttons == 1) {
        inter = setInterval(go, 100);
        par.isDown = true;
    }
    document.body.addEventListener('mousemove', mousemove);
    document.body.addEventListener('mousedown', mousedown);
});

function mousemove(ev) {
    if (ev.buttons == 0) {
        if (inter !== null) {
            clearInterval(inter);
            inter = null;
        }
        par.isDown = false;
    };
    par.x = ev.x;
    par.y = ev.y;
}

function mouseup(ev) {
    if (inter !== null) {
        clearInterval(inter);
        inter = null;
    }
    par.isDown = false;
}

function mousedown(ev) {
    middle.y = document.body.offsetHeight / 2;
    middle.x = document.body.offsetWidth / 2;
    par.isDown = true;
    if(inter == null){
        inter = setInterval(go, 100);
    }
}

function mouseoutBody(ev) {
    if (inter !== null) {
        clearInterval(inter);
        inter = null;
    }
}

function mouseenterBody(ev) {
    if (ev.buttons == 1) {
        inter = setInterval(go, 100);
        par.isDown = true;
    }
}

function go() {
    if (par.isDown) {
        if(par.x > middle.x){
            pos.x-= 10;
        }else if(par.x < middle.x){
            pos.x+= 10;
        };
        if(par.y > middle.y){
            pos.y-= 10;
        }else if(par.y < middle.y){
            pos.y+= 10;
        };
        document.body.style.backgroundPosition = `${pos.x}px ${pos.y}px`;
    }
}


// let press = false;
// const coordinates = {
//     x: 0,
//     y: 0
// }
// const keys = {
//     W: false,
//     A: false,
//     S: false,
//     D: false
// }

// const inter = {
//     W: null,
//     A: null,
//     S: null,
//     D: null
// }

// document.body.addEventListener('keydown', (ev) => {
//     switch (ev.code) {
//         case 'KeyW':
//             keys.W = true;
//             if (keys.S) {
//                 keys.S = false
//             };
//             break;
//         case 'KeyA':
//             keys.A = true;
//             if (keys.D) {
//                 keys.D = false
//             };
//             break;
//         case 'KeyS':
//             keys.S = true;
//             if (keys.W) {
//                 keys.W = false
//             };
//             break;
//         case 'KeyD':
//             keys.D = true;
//             if (keys.A) {
//                 keys.A = false
//             };
//             break;
//     }
//     go();
// })

// document.body.addEventListener('keyup', (ev) => {
//     switch (ev.code) {
//         case 'KeyW':
//             keys.W = false;
//             break;
//         case 'KeyA':
//             keys.A = false;
//             break;
//         case 'KeyS':
//             keys.S = false;
//             break;
//         case 'KeyD':
//             keys.D = false;
//             break;
//     }
//     go();
// });

// function go() {
//     if (keys.W == true) {
//             document.body.style.backgroundPositionY = `${coordinates.y += 5}px`;
//     }
//     if (keys.A == true) {
//             document.body.style.backgroundPositionX = `${coordinates.x += 5}px`;
//     }
//     if (keys.S == true) {
//             document.body.style.backgroundPositionY = `${coordinates.y -= 5}px`;
//     }
//     if (keys.D == true) {
//             document.body.style.backgroundPositionX = `${coordinates.x -= 5}px`;
//     }
// }


//TODO fix 'diagonal-key-up-stop' bug(if 2 keys down, and 1 from this keys up, object stoped)
//TODO realize arrow keys
//TODO realize fading effect to move
//TODO rewrite code at MVC structure
// TODO realize parallax background