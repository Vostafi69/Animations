const Particles2 = () => {

    let w = window.innerWidth;
    let h = window.innerHeight;

    const properties = {
        canvasBackGroundColor   : 'rgba(0, 0, 0, .95)',
        particleColor           : 'rgba(116, 89, 57, 1)',
        particlesCount          : 250,
        particlesSpeed          : .2,
        particleRadius          : 3,
        lineLength              : 130,
        lineWidth               : 1
    };

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.style.backgroundColor = properties.canvasBackGroundColor;
    const cont = document.querySelector('.main');
    cont.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    let particlesList = [];
    let cursorX;
    let cursorY;

    window.onresize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        drawParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.speedX = Math.random() * (properties.particlesSpeed * 2) - properties.particlesSpeed;
            this.speedY = Math.random() * (properties.particlesSpeed * 2) - properties.particlesSpeed;
        }

        position() {
            this.x + this.speedX > w && this.speedX > 0 || this.x + this.speedX < 0 && this.speedX < 0 ? this.speedX *= -1 : this.speedX;
            this.y + this.speedY > h && this.speedY > 0 || this.y + this.speedY < 0 && this.speedY < 0 ? this.speedY *= -1 : this.speedY;
            this.x += this.speedX;
            this.y += this.speedY;
        }

        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
    }

    function drawParticles() {
        for (let particle in particlesList) {
            particlesList[particle].reDraw();
            particlesList[particle].position();
        }
    }

    function clearbackGround() {
        ctx.clearRect(0, 0, w, h);
    }

    canvas.onmousemove = (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
    }

    canvas.onmouseleave = () => {
        cursorX = -properties.lineLength;
        cursorY = -properties.lineLength;
    }

    function drawLinesInit() {
        let x1, y1, x2, y2, cursorXpos, cursorYpos;
        for (let i in particlesList) {
            cursorXpos = cursorX;
            cursorYpos = cursorY;
            x1 = particlesList[i].x;
            y1 = particlesList[i].y;
            
            drawLines(x1, y1, cursorXpos, cursorYpos);

            for (let j in particlesList) {

                x2 = particlesList[j].x;
                y2 = particlesList[j].y;

                drawLines(x1, y1, x2, y2) 
            }   
            
        }    
    }

    function drawLines(x1, y1, x2, y2) {
        let lineLenght = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (lineLenght < properties.lineLength) {
            let opacity = 1 - lineLenght / properties.lineLength;
            ctx.lineWidth = properties.lineWidth;
            ctx.strokeStyle = `rgba(116, 24, 57, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        } 
    }

    function loop() {
        clearbackGround();
        drawParticles();
        drawLinesInit();
        requestAnimationFrame(loop);
    }

    function init() {
        for (let i = 0; i < properties.particlesCount; i++) {
            particlesList.push(new Particle());
        }
        loop();
    }
    init();

};

export default Particles2;