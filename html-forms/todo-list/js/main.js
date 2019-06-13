/*jshint esversion: 6*/ 
"use strict";

function review(e) {
	const done = document.querySelectorAll('.list-block input[type="checkbox"]:checked').length;
	const total = document.querySelectorAll('.list-block input[type="checkbox"]').length;
	if (done === total) {
		document.querySelector('.list-block').classList.add('complete');
	} else {
		document.querySelector('.list-block').classList.remove('complete');		
	}
	document.querySelector('output').innerHTML = `${done} из ${total}`;
}

function onLoad() {
	document.querySelectorAll('.list-block input[type="checkbox"]').forEach(elem => elem.addEventListener('change', review));
	review();
}

document.addEventListener('DOMContentLoaded', onLoad);