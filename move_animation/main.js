let press = false;
const coordinates = {
    x: 0,
    y: 0
}
const keys = {
    W: false,
    A: false,
    S: false,
    D: false
}

const inter = {
    W: null,
    A: null,
    S: null,
    D: null
}

document.body.addEventListener('keydown', (ev) => {
    switch (ev.code) {
        case 'KeyW':
            keys.W = true;
            if(keys.S){
                keys.S = false
            };
            break;
        case 'KeyA':
            keys.A = true;
            if(keys.D){
                keys.D = false
            };
            break;
        case 'KeyS':
            keys.S = true;
            if(keys.W){
                keys.W = false
            };
            break;
        case 'KeyD':
            keys.D = true;
            if(keys.A){
                keys.A = false
            };
            break;
    }
    go();
})

document.body.addEventListener('keyup', (ev) => {
    switch (ev.code) {
        case 'KeyW':
            keys.W = false;
            break;
        case 'KeyA':
            keys.A = false;
            break;
        case 'KeyS':
            keys.S = false;
            break;
        case 'KeyD':
            keys.D = false;
            break;
    }
    go();
});

function go(){
    if (keys.W == true) {
        document.body.style.backgroundPositionY = `${coordinates.y += 10}px`;
    }
    if (keys.A == true) {
        document.body.style.backgroundPositionX = `${coordinates.x += 10}px`;
    }
    if (keys.S == true) {
        document.body.style.backgroundPositionY = `${coordinates.y -= 10}px`;
    }
    if (keys.D == true) {
        document.body.style.backgroundPositionX = `${coordinates.x -= 10}px`;
    }
}


//TODO fix 'diagonal-key-up-stop' bug(if 2 keys down, and 1 from this keys up, object stoped)
//TODO realize arrow keys
//TODO realize fading effect to move
//TODO rewrite code at MVC structure
// TODO realize parallax background