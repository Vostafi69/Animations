const Groups = () => {

    const properties = {
        spaceDeametr: 32,
        dotDiametr  : 14,
        waveLenth   : 100,
        velocity    : .01,
        direction   : 1,
        displacement: 1
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;

    let dotsList;

    canvas.style.background = 'rgba(17, 17, 23, 1)';

    const main = document.querySelector('.main');
    main.appendChild(canvas);

    window.onresize = function() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
        init();
    }

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = properties.dotDiametr / 2;
            this.scale = getDistans(x, y) / properties.waveLenth;
        }

        update() {
            this.resize();
            this.drow();
        }

        resize() {
            this.scale = this.scale - properties.velocity * properties.direction;
        }

        drow() {
            let r = this.radius * (1 - Math.abs(Math.sin(this.scale)));
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    }

    init();
    function init() {
        dotsList = [];

        const dotsCountY = h / properties.spaceDeametr | 0;
        const dotsCountX = w / properties.spaceDeametr | 0;
        const startX =  (properties.spaceDeametr + w - dotsCountX * properties.spaceDeametr) / 2; 
        const startY = (properties.spaceDeametr + h - dotsCountY * properties.spaceDeametr) / 2; 

        let displacement = properties.spaceDeametr / 4 * properties.displacement;

        for (let j = 0; j < dotsCountY; j++) {
            displacement = - displacement;
            let y = startY + j * properties.spaceDeametr;
            for(let i = 0; i < dotsCountX; i++) {
                let x = startX + i * properties.spaceDeametr + displacement;
                dotsList.push(new Dot(x, y));
            }
        }
    }

    loop();
    function loop() {
        ctx.clearRect(0, 0, w, h);

        for (let a in dotsList) {
            dotsList[a].update();
        }

        requestAnimationFrame(loop);
    }

    function getDistans(x, y) {
        let dx = w / 2 - x;
        let dy = h / 2 - y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

};

export default Groups;