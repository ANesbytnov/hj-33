/*jshint esversion: 6*/
"use strict";
[...document.getElementsByClassName('drum-kit__drum')].forEach((el) => el.onclick = function() { 
	const player = this.getElementsByTagName('audio')[0];
	player.pause(); 
	player.currentTime = 0; 
	player.play(); 
});