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

let obj = document.querySelector('.obj');
let obj2 = document.querySelector('.obj2');
const container = document.querySelector('.cont');
const planet = document.querySelector('.planet');

posObj = {
    x: obj.offsetLeft,
    y: obj.offsetTop
}

posObj2 = {
    x: obj2.offsetLeft,
    y: obj2.offsetTop
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
    ev.buttons == 2? eat():0;
    if(ev.buttons == 1){
        middle.y = document.body.offsetHeight / 2;
        middle.x = document.body.offsetWidth / 2;
        par.isDown = true;
        if(inter == null){
            inter = setInterval(go, 100);
        }
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
            pos.x-= 15;
            posObj.x-= 15;
            posObj2.x-= 15;
        }else if(par.x < middle.x){
            pos.x+= 15;
            posObj.x+= 15;
            posObj2.x+= 15;
        };
        if(par.y > middle.y){
            pos.y-= 15;
            posObj.y-= 15;
            posObj2.y-= 15;
        }else if(par.y < middle.y){
            pos.y+= 15;
            posObj.y+= 15;
            posObj2.y+= 15;

        };
        document.body.style.backgroundPosition = `${pos.x}px ${pos.y}px`;
        // obj.style.left = `${posObj.x}px`;
        // obj.style.top = `${posObj.y}px`;
        // obj2.style.left = `${posObj2.x}px`;
        // obj2.style.top = `${posObj2.y}px`;
        // obj.style.transform = `translate(${pos.x}pt,${pos.y}pt)`;
    }
    // if((posObj.x + 25) > (middle.x - 100)&&
    // (posObj.y + 25) > (middle.y - 100)&&
    // (posObj.x + 25) < (middle.x + 100)&&
    // (posObj.y + 25)<(middle.y + 100)){
    //     gravity(obj, 75);
    // }
    // if((posObj2.x + 25) > (middle.x - 100)&&
    // (posObj2.y + 25) > (middle.y - 100)&&
    // (posObj2.x + 25) < (middle.x + 100)&&
    // (posObj2.y + 25)<(middle.y + 100)){
    //     gravity2(obj2, 95);
    // }

}

function eat(){
    let childrens = planet.children;
    for (let key of childrens){
        key.classList.toggle(`food${key.id}`);
        console.log(key);
    };
}

function gravity(ob, distance){
    planet.append(ob);
    obj.style.left = `${distance}px`;
    obj.style.top = `${distance}px`;
    obj = 0;
}

function gravity2(ob, distance){
    planet.append(ob);
    obj.style.left = `${distance}px`;
    obj.style.top = `${distance}px`;
    obj2 = 0;
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



//TODO realize arrow keys
//TODO realize fading effect to move
//TODO rewrite code at MVC structure
// TODO realize parallax background