/*jshint esversion: 6*/
"use strict";

const songs = [
	{ "name": "LA Chill Tour", "url": "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Chill Tour.mp3"},
	{ "name": "This is it band", "url": "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3"},
	{ "name": "LA Fusion Jam", "url": "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3"},
];

let songId = 0;

const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const audio = mediaplayer.getElementsByTagName('audio')[0];
const title = mediaplayer.getElementsByClassName('title')[0];

const setSong = (id) => {
	songId = id;
	audio.src = songs[songId]["url"];
	title.title = songs[songId]["name"];
	if (mediaplayer.classList.contains('play')) {
		audio.play();
	}
};

document.getElementsByClassName('playstate')[0].onclick = () => { 
	mediaplayer.classList.toggle('play');
	if (mediaplayer.classList.contains('play')) {
		audio.play();
	} else {
		audio.pause();
	}
};
document.getElementsByClassName('stop')[0].onclick = () => { 
	audio.pause(); 
	mediaplayer.classList.remove('play'); 
	audio.currentTime = 0; 
};
document.getElementsByClassName('next')[0].onclick = () => setSong((songId + 1) % songs.length);
document.getElementsByClassName('back')[0].onclick = () => setSong((songId + songs.length - 1) % songs.length);
