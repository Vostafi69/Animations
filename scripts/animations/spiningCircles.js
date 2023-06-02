const Rings = () => {
	const cnv = document.createElement('canvas');
	const ctx = cnv.getContext('2d');
	cnv.width  = innerWidth;
	cnv.height = innerHeight;
	cnv.style.background = "rgba(0, 0, 0, .95)";
	const main = document.querySelector('.main');
    main.appendChild(cnv);
	
	const numberOfRings = 8;
	const ringRadiusOffset = 3;
	const ringRadius = 200;
	const waveOffset = 15;
	const colors = ['hsl(300, 100%, 95%)', 'hsl(300, 100%, 90%)', 'hsl(300, 100%, 85%)', 'hsl(300, 100%, 80%)', 'hsl(300, 100%, 75%)', 'hsl(300, 100%, 70%)', 'hsl(300, 100%, 65%)', 'hsl(300, 100%, 60%)'];
	let startAngel = 0;
	
	function updateRings() {

		for (let i = 0; i <  numberOfRings; i++) {
			let radius = i * ringRadiusOffset + ringRadius;
			let offsetAngel = i * waveOffset * Math.PI / 180;
			drawRing(radius, colors[i], offsetAngel);
		}
		
		startAngel >= 360? startAngel = 0 : startAngel++;
	}
	
	let centerX = cnv.width / 2;
	let centerY = cnv.height / 2;
	
	const maxWaveAmplitude = 17;
	const nimberOfWaves = 7;
	
	function drawRing(radius, color, offsetAngel) {
		ctx.strokeStyle = color;
		ctx.lineWidth = 9;
		
		ctx.beginPath();
		
		for (let j = -180; j < 180; j++) {
			let currentAngel = (j + startAngel) * Math.PI / 180;
			
			let displacement = 0;
			let now = Math.abs(j);
			
			if (now > 70) {
				displacement = (now - 70) / 70;
			}
			
			if (displacement >= 1) {
				displacement = 1;
			}
			
			let waveAmplitude = radius + displacement * Math.sin((currentAngel + offsetAngel) * nimberOfWaves) * maxWaveAmplitude;
			let x = centerX + Math.cos(currentAngel) * waveAmplitude;
			let y = centerY + Math.sin(currentAngel) * waveAmplitude;
			j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);

		}
		ctx.closePath();
		ctx.stroke();
	}
	
	function loop() {
		cnv.width |= 0; //ctx.clearRect(0, 0, cnv.width, cnv.height);
		updateRings();
		requestAnimationFrame(loop);
	}
	loop();	
};

export default Rings;