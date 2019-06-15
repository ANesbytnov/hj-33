/*jshint esversion: 6*/ 
"use strict";

document.addEventListener('DOMContentLoaded', onLoad);

function checkForm() {
	console.log('checkForm');
	console.log([...document.querySelectorAll('.contentform input')].filter(el => el.value == ''));
	console.log([...document.querySelectorAll('.contentform textarea')].filter(el => el.value == ''));
	document.querySelector('.button-contact').disabled = 
		[...document.querySelectorAll('.contentform input')].filter(el => el.value == '').length > 0 ||
		[...document.querySelectorAll('.contentform textarea')].filter(el => el.value == '').length > 0;
}


function filterNumbers(e) {
	e.target.value = e.target.value.match(/\d+/g);
}

function onLoad() {
	document.querySelector('.contentform input[name="zip"]').addEventListener('input', filterNumbers);
	document.querySelectorAll('.contentform input').forEach(inp => inp.addEventListener('input', checkForm));
	document.querySelectorAll('.contentform textarea').forEach(ta => ta.addEventListener('input', checkForm));
	
}