/*jshint esversion: 6*/ 
'use strict';

nav.addEventListener('click', function(event) {
	event.preventDefault();
	document.querySelector('.gallery-current').classList.remove('gallery-current');
	const a = event.target.closest('a');
	a.classList.add('gallery-current');
	view.src = a.href;
});