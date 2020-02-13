export class MainMenuView{
    constructor({click}){
        this.click = click;
        this.btns = document.querySelectorAll('.btn');
        this.menu = document.querySelector('.mainMenu');
        this.over = document.querySelector('.gameover');
        this.panel = document.querySelector('.panel');
        this.mass = document.querySelector('.mass-loader');
    }

    init(){
        this.btns.forEach((el)=>{
            el.addEventListener('click',this.click);
        });
    }

    startGame(){
        this.menu.classList.toggle('hidden');
        this.panel.classList.toggle('hidden');
        this.over.classList.contains('hidden')?0:this.over.classList.toggle('hidden');
    }

    changeMass(ev){
        this.mass.style.backgroundImage = `linear-gradient(to right, white ${ev.mass}%, transparent ${ev.n}%)`;
    }

    gameover(){
        this.menu.classList.toggle('hidden');
        this.over.classList.toggle('hidden');
        this.panel.classList.toggle('hidden');
        this.init();
    }

}