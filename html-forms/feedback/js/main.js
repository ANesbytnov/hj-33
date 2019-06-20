/*jshint esversion: 6*/ 
"use strict";

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
	const contentform = document.querySelector('.contentform');
	const output = document.querySelector('#output');
	const inputs = contentform.querySelectorAll('input, textarea');

	const checkForm = () => contentform.querySelector('.button-contact').disabled = [...inputs].filter(el => el.value == '').length > 0;
	const filterNumbers = (e) => e.target.value = e.target.value.match(/\d+/g);

	contentform.querySelector('input[name="zip"]').addEventListener('input', filterNumbers);
	inputs.forEach(elem => elem.addEventListener('input', checkForm));

	contentform.addEventListener('submit', function(e) {
		e.preventDefault();

		inputs.forEach(elem => {
			const inpByName = document.querySelector('#' + elem.name);
			if (inpByName !== null) {
				inpByName.innerHTML = elem.value;
			}
		});

		output.classList.remove('hidden');
		e.target.classList.add('hidden');
	});

	output.querySelector('.button-contact').addEventListener('click', function(e) {
		output.classList.add('hidden');
		contentform.classList.remove('hidden');		
	});
}