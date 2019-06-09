/*jshint esversion: 6*/ 
'use strict';

const media = document.querySelector('.set');

function keyDownUp(e) {
	if (e.type == 'keyup' || !e.repeat) {
		switch (e.keyCode) {
			case 16: // Shift
				media.classList.toggle('middle');
				media.classList.toggle('lower');
				break;
			case 18: // Alt
				media.classList.toggle('middle');
				media.classList.toggle('higher');
				break;
		}
	}
}

document.addEventListener('keydown', keyDownUp);
document.addEventListener('keyup', keyDownUp);

// Урл к звуку собирается из пути к папке, затем класс (lower, middle, higher) и название файла из массива soundNames
const pathSounds = 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/';
const soundNames = [
	'first.mp3',
	'second.mp3',
	'third.mp3',
	'fourth.mp3',
	'fifth.mp3'
];

[...document.querySelectorAll('.set > li')].forEach((elem, ind) => {
	elem.addEventListener('click', function(e) {
    	const player = e.target.querySelector('audio'); // берем audio внутри текущего кликнутого элемента
    	player.pause();
		player.currentTime = 0;
		const tone = ['lower', 'middle', 'higher'].find((curr) => media.classList.contains(curr)); // находим текущий тон = класс у media
		player.src = pathSounds + tone + '/' + soundNames[ind]; // собираем путь к урлу звука клавиши
		player.play();
	});
});