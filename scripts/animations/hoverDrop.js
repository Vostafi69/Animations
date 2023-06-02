const MagicCursor = () => {

    const canvas = document.createElement('canvas');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    canvas.style.backgroundColor = 'rgba(0, 0, 0, .9)';

    const main = document.querySelector('.main');
    main.appendChild(canvas);

    const properties = {
        lifeTime        : 45,
        particleCount   : 3
    };

    let mouse = {
        x: undefined,
        y: undefined
    };

    let particleList = [];

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighter';

    function getRandomintNumber(max, min) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    class Particle {
        constructor(x , y) {
            this.x = x + getRandomintNumber(30, 5);
            this.y = y + getRandomintNumber(30, 5);
            this.time = 0;
            this.lifeTime = properties.lifeTime;
            this.size = getRandomintNumber(30, 10);
            this.color = `hsl(${getRandomintNumber(360, 0)}, 100%, 50%)`;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size *  (1 - (this.time / this.lifeTime)), 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.lifeTime > this.time) {
                this.time++;
            }
            else {
                this.size = 0;
            }

            particleList = particleList.filter((item) => {
                return item.size != 0;
            });
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, w, h);
    }

    function update() {
        for (let i = 0; i < particleList.length; i++) {
            particleList[i].update();
            if (particleList[i] != undefined) {
                particleList[i].draw();
            }
        }
    }

    function loop() {
        clearCanvas();
        update();

        requestAnimationFrame(loop);
    }
    
    canvas.onmousemove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        for (let i = 0; i < properties.particleCount; i++) {
            particleList.push(new Particle(mouse.x, mouse.y));
        }
    };

    function init() {
        loop();
    }

    init();
};

export default MagicCursor;