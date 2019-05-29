/*jshint esversion: 6*/
'use strict';

const urls = [
	'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png',
	'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png',
	'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png',
	'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png',
	'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'
];

if (slider && urls.length > 0) {
	let urlId = -1;
	const rotate = () => slider.setAttribute('src', urls[urlId = (urlId + 1) % urls.length]);
	rotate();
	setInterval(rotate, 5000);
}