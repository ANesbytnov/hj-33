'use strict';
document.addEventListener('DOMContentLoaded', function() {
	const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

	const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
	const randIndex = () => randBetween(0, colors.length - 1);
	const randRadius = () => randBetween(0, 11) / 10; 	// радиус будет от 0 до 1.1
	const randAlpha = () => randBetween(8, 10) / 10; 	// alpha будет от 0.8 до 1

	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	function drawSky() {
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.closePath();

		const count = randBetween(200, 400);

		for (let i = 0; i < count; i++) {
			ctx.beginPath();
			ctx.fillStyle = colors[randIndex()];
			ctx.globalAlpha = randAlpha();

			const x = randBetween(0, canvas.width);
			const y = randBetween(0, canvas.height);

			ctx.arc(x, y, randRadius(), 0, Math.PI*2);
			ctx.fill();
			ctx.closePath();
		}
	}

	canvas.addEventListener('click', drawSky);

	drawSky();

});