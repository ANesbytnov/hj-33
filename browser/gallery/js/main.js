/*jshint esversion: 6*/
"use strict";

const urls = [
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'
];

if (currentPhoto && urls.length > 0) {
	let urlId = 0;
	currentPhoto.setAttribute('src', urls[urlId]);
	if (nextPhoto) {
		nextPhoto.onclick = () => currentPhoto.setAttribute('src', urls[urlId = (urlId + 1) % urls.length]);
	}
	if (prevPhoto) {
		prevPhoto.onclick = () => currentPhoto.setAttribute('src', urls[urlId = (urlId + urls.length - 1) % urls.length]);
	}
}