'use strict';
const body = document.querySelector('body');
const draw = document.querySelector('#draw');
const ctx = draw.getContext("2d");

let curves = [];
let drawing = false;
let needsRepaint = false;

let brush_radius = 100;
let delta_radius = -1;

let hue = 0;
let delta_hue;

const setSize = () => {
	draw.width = screen.width;
	draw.height = screen.height;
};

const clearScr = () => {
	ctx.clearRect(0, 0, draw.width, draw.height);
	curves = [];
};

const firstTasks = () => {
	setSize();
	clearScr();	
};

firstTasks();

window.addEventListener('resize', firstTasks);
draw.addEventListener('dblclick', clearScr);

// Отрисовка линии
function smoothCurve(points) {
	const lenPointsMinus1 = points.length - 1;
	for (let i = 0; i < lenPointsMinus1; i++) {
		ctx.beginPath();
		// Необходимо скруглить края линии задав свойствам контекста lineJoin и lineCap значение round.
		ctx.lineJoin = 'round'; 
		ctx.lineCap = 'round';
		ctx.strokeStyle = points[i].colorFill;
		ctx.moveTo(points[i].x, points[i].y);
		ctx.lineWidth = points[i].radius;
		ctx.lineTo(points[i + 1].x, points[i + 1].y);
		ctx.stroke();
	}
}

function makePoint(x, y, shiftKey) {
	const result = {
		x: x,
		y: y,
		radius: brush_radius,
		colorFill: `hsl(${hue}, 100%, 50%)`
	};

	// Толщина линии меняется при каждом тике на единицу в диапазоне от 5 до 100 включительно. Начинать нужно со 100
	brush_radius += delta_radius;
	if ( brush_radius < 5 || brush_radius > 100 ) {
		// если ушли за предел диапазона, то меняем знак дельте
		// и дважды плюсуем (один - это откат предыдущего значения и ещё один - делаем шаг в новом направлении дельты)
		delta_radius = -delta_radius;
		brush_radius += 2 * delta_radius;
	}

	// Оттенок меняется при каждом тике на единицу в диапазоне от 0 до 359 включительно. При этом если нажата клавиша Shift, то он уменьшается, иначе увеличивается. Если оттенок достиг максимума или минимума, то значение устанавливается в минимум или максимум соответственно.  
	delta_hue = shiftKey ? -1 : +1;
	hue += delta_hue;
	if (hue > 359) {
		hue = 0;
	} else if (hue < 0) {
		hue = 359;
	}

	return result;
}


draw.addEventListener("mousedown", (evt) => {
	drawing = true;

	const curve = []; // create a new curve

	curve.push(makePoint(evt.offsetX, evt.offsetY, evt.shiftKey)); // add a new point
	curves.push(curve); // add the curve to the array of curves
	needsRepaint = true;
});

draw.addEventListener("mouseup", (evt) => {
	drawing = false;
});

draw.addEventListener("mouseleave", (evt) => {
	drawing = false;
});

draw.addEventListener("mousemove", (evt) => {
	if (drawing) {
		// add a point
		const point = makePoint(evt.offsetX, evt.offsetY, evt.shiftKey)
		curves[curves.length - 1].push(point);
		needsRepaint = true;
	}
});

// rendering
function repaint () {
	// clear before repainting
	ctx.clearRect(0, 0, draw.width, draw.height);

	curves.forEach((curve) => {
		smoothCurve(curve);
	});
}

function tick () {
	if (needsRepaint) {
		repaint();
		needsRepaint = false;
	}

	window.requestAnimationFrame(tick);
}

tick();