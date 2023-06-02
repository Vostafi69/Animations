const ColorCircles = () => {

    const canvas = document.createElement('canvas');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    canvas.style.backgroundColor = 'white';

    const ctx = canvas.getContext('2d');

    const main = document.querySelector('.main');
    main.appendChild(canvas);

    let particleList;
    let mouseX;
    let mouseY;

    const properties = {
        particleCount   : 400,
        particleRadius  : 5,
        particleSpeed   : .5,
        scaleRadius     : 50,
        scaleStrength   : 5,
        colors          : ['156,189,202', '255,79,42', '40,46,51', '219,234,242'],
    };

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = Math.random() * (properties.particleRadius / 2) + properties.particleRadius / 3;
            this.speedX = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
            this.speedY = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
            this.color = properties.colors[Math.floor(Math.random() * (properties.colors.length))]; 
        }

        position() {
            this.x + this.speedX >= w && this.speedX > 0 || this.x + this.speedX <= 0 && this.speedX < 0 ? this.speedX *= -1 : this.speedX;
            this.y + this.speedY >= h && this.speedY > 0 || this.y + this.speedY <= 0 && this.speedY < 0 ? this.speedY *= -1 : this.speedY;
            this.x += this.speedX;
            this.y += this.speedY;
        }

        draw() {
            ctx.beginPath();
            if (this.x >= mouseX - properties.scaleRadius && this.x <= mouseX + properties.scaleRadius &&
                this.y >= mouseY - properties.scaleRadius && this.y <= mouseY + properties.scaleRadius
                ) {
                ctx.arc(this.x, this.y, this.radius * properties.scaleStrength, 0, Math.PI * 2);
            }
            else {
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            }
            ctx.closePath();
            ctx.fillStyle = `rgb(${this.color})`;
            ctx.fill();
        } 
    }

    window.onresize = () => {
        canvas.width = w = window.innerWidth;
        canvas.height = h = window.innerHeight;
    };

    canvas.onmousemove = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    };

    canvas.onmouseleave = () => {
        mouseX = -properties.scaleRadius*2;
        mouseY = -properties.scaleRadius*2;
    }

    function redrawBackGround() {
        ctx.clearRect(0, 0, w, h);
    }

    function update() {
        for (let item of particleList) {
            item.position();
            item.draw();
        }
    }

    function loop() {
        redrawBackGround();
        update();

        requestAnimationFrame(loop);
    }

    function init() {
        particleList = new Array(properties.particleCount).fill().map(() => {
            return new Particle(Math.random() * w, Math.random() * h);
        });

        loop();
    }
    init();

};

export default ColorCircles;