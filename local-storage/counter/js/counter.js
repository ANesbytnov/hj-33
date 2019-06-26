/*jshint esversion: 6*/ 
'use strict';

function reCount(delta) {
	localStorage.counter = delta === false || Number.isNaN(+localStorage.counter) || +localStorage.counter < -delta ? 0 : +localStorage.counter + delta;
	counter.textContent = localStorage.counter;
}

document.addEventListener('DOMContentLoaded', e => reCount(0));
increment.addEventListener('click', e => reCount(+1));
decrement.addEventListener('click', e => reCount(-1));
reset.addEventListener('click', e => reCount(false));