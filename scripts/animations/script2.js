const Particles = () => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.backgroundColor = 'rgb(17, 17, 23, 1)';
    let w =  window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const main = document.querySelector('.main');
    main.appendChild(canvas);

    const particles = [];
    const properties = {
        particleColor   : 'rgba(150, 255, 13, 1)',
        particleRadius  : 3,
        particleCount   : 250,
        speed           : .5,
        lineLength      : 100,
        lineWidth       : .5
    };

    window.onresize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.speedX = Math.random() * (properties.speed * 2) - properties.speed;
            this.speedY = Math.random() * (properties.speed * 2) - properties.speed;
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

    function reDrawBG() {
        ctx.clearRect(0, 0, w, h);
    }

    function reDrawLines() {
        let x1, x2, y1, y2, length, opacity;

        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;

                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length <= properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = properties.lineWidth;
                    ctx.strokeStyle = `rgba(150, 255, 13, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function reDrawParticles() {
        for (let particle in particles) {
            particles[particle].position();
            particles[particle].reDraw();
        }
    }

    function loop() {
        reDrawBG();
        reDrawParticles();
        reDrawLines();
        requestAnimationFrame(loop);
    }

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    init();

};

export default Particles;