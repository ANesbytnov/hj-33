/*jshint esversion: 6*/ 
'use strict';

const secret = [89, 84, 78, 74, 75, 74, 85, 66, 90];
let curInd = 0;

document.addEventListener('keydown', function(e) {
	if (!e.repeat) {
		if (e.keyCode == secret[curInd]) {
			if (++curInd === secret.length) {
				document.querySelector('.secret').classList.add('visible');
			}
		} else {
			curInd = 0;
		}

		if (e.ctrlKey && e.altKey && e.keyCode === 84) { // Ctrl + Alt + T
			document.querySelector('nav').classList.toggle('visible');
		}
	}
});