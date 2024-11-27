// Created by Rania Emran

var activeColor = "black";
var selectedMaxDotSize = 2;

window.onload = () => {

    const dotSizeSelector = document.getElementById("dotsize");
    
    dotSizeSelector.onchange = () => {
        selectedMaxDotSize = parseInt(dotSizeSelector.value);
    }

    const body = document.querySelector("body");
    const btnColors = document.querySelector("#colors");
    const btnBgColors = document.querySelector("#bgcolors");
    
    const availableColors = [
    "white",,"red", "orange", "yellow","lightgreen","green", "teal", "blue", "indigo", "violet", "black",
    ];
    
    availableColors.forEach (
    
        color => {
            let btnPal = document.createElement("button");
            let btnBg = document.createElement("button");
        
            btnPal.style.backgroundColor = color;
            btnBg.style.backgroundColor  = color;
            
            btnPal.onclick = () => {
                activeColor = color ;
                dotSizeSelector.style.accentColor = color;
            }
                
            btnBg.onclick = () => {
                body.style.backgroundColor = color ;
            }
            
            btnColors.appendChild(btnPal );
            btnBgColors.appendChild(btnBg );
        }
    );
    
    function getRandNumber(){
        return Math.floor(Math.random()*256);
    }
    
    function getRandomColor(){
        let r = getRandNumber();
        let g = getRandNumber();
        let b = getRandNumber();
        let a = Math.random();
        return `rgba(${r},${g},${b},${a})`;
    }
    
    const randPal = document.getElementById("rand-pal");
    const randBg = document.getElementById("rand-bg");
    
    randPal.onclick = () => {
        color = getRandomColor();
        randPal.style.backgroundColor = color;
        activeColor = color;
        dotSizeSelector.style.accentColor = color;
    }
    
    randBg.onclick = () => {
        color = getRandomColor();
        randBg.style.backgroundColor = color;
        body.style.backgroundColor = color;
    }
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    let mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    class Dot {
        constructor(x, y) {
            this.size = Math.random() * selectedMaxDotSize + 1;
            this.x = x;
            this.y = y;
            this.color = activeColor;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Effect {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.dots = [];
        }

        addDot(x, y) {
            this.dots.push(new Dot(x, y));
        }

        drawDots() {
            this.dots.forEach(dot => {
                dot.draw(this.ctx);
            });
        }
    }

    const effect = new Effect(canvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.drawDots();
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        effect.addDot(mouse.x, mouse.y);
    });

    canvas.addEventListener('touchmove', (event) => {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        effect.addDot(mouse.x, mouse.y);
    });

    animate();
    
    alert(`This is a 'fork' of\n https://sololearn.com/compiler-playground/WO36QePKiw48/?ref=app 
 `)
};
