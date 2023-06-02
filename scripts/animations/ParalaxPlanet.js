const HorizontalRings = () => {

    const canvas = document.createElement('canvas');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    //canvas.style.backgroundColor = 'rgb(17, 17, 23, .9)';

    const main = document.querySelector('.main');
    main.appendChild(canvas);

    let particleList;

    const ctx = canvas.getContext('2d');

    const properties = {
        particleRadius  : 150,
        particleCount   : 350,
        particleWidth   : 6,
        particleSpeed   : .1,
    }

    class Particle {
        constructor() {
            this.randomRadius  = Math.random() * (properties.particleRadius / 2) + properties.particleRadius;
            this.randomAngle   = Math.random() * 360;
            this.randomSpeed   = (Math.random()  + .1) * properties.particleSpeed;
            this.particleWidth = properties.particleWidth;
            this.impact        = properties.particleRadius / this.randomRadius;
        }   

        draw() {
            let cos            = Math.cos(Math.PI / 180 * this.randomAngle);
            let sin            = Math.sin(Math.PI / 180 * this.randomAngle);

            this.particleWidth = properties.particleWidth + (properties.particleWidth * sin) * this.impact;
            
            let offsetX        = cos * this.randomRadius;
            let offsetY        = sin * this.randomRadius * (1 - this.impact);

            let currentX       = w / 2 + cos * this.randomRadius;
            let currentY       = h / 2 + sin * this.randomRadius;

        let hc                 = this.randomAngle;
            let s              = 100;
            let l              = 60;
            let color          = `hsl(${hc}, ${s}%, ${l}%)`;

            ctx.beginPath();
            ctx.arc(currentX + offsetX, currentY, this.particleWidth, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            this.randomAngle   += this.randomSpeed;
        }
    }

    function reDraw() {
        for (let item in particleList) {
            particleList[item].draw();
        }
    }

    function redDrawBackGround() {
        // ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, w, h);
    }
    
    function loop() {
        redDrawBackGround();
        reDraw();
        requestAnimationFrame(loop);
    }

    function init() {
        particleList = new Array(properties.particleCount).fill().map(() => {
            return new Particle();
        });
        loop();
    }
    init();

};

export default HorizontalRings;