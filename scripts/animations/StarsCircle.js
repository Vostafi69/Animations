const Stars = () => {

    const canvas = document.createElement('canvas');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h; 
    const ctx = canvas.getContext('2d');

    const main = document.querySelector('.main');
    main.appendChild(canvas);

    const properties = {
        canvasBackgroundColor   : 'rgb(0, 0, 8, .1)',
        countOfStars            : 500,
        speed                   : 0.01,
        starColor               : 'white',
        starWidth               : 1
    };

    const random = (n) => Math.random() * n;
    let startList = new Array(properties.countOfStars).fill().map(() => {
        return {r: random(w), a: random(Math.PI * 2), s: random(properties.speed)};
    });

    function loop() {
        ctx.fillStyle = properties.canvasBackgroundColor;
        ctx.fillRect(0, 0, w, h);

        startList.forEach((star) => {
            star.a += star.s;
            ctx.beginPath();
            ctx.arc(Math.cos(star.a) * star.r + w / 2, Math.sin(star.a) * star.r + h / 2, properties.starWidth, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.starColor;
            ctx.fill();
        });

        requestAnimationFrame(loop);
    }

    function init() {
        loop();
    }

    init();

    window.onresize = () => {
        canvas.width = w = window.innerWidth;
        canvas.height = h = window.innerHeight;
    }

};

export default Stars;