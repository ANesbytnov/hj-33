/*jshint esversion: 6*/ 
'use strict';

function onSubmit(node, url, mess) {
	const xhr = new XMLHttpRequest();
	const fData = new FormData(node);

	const object = {};
	fData.forEach((value, key) => {object[key] = value});

	xhr.addEventListener("load", onLoad);
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(object));

	function onLoad() {
		if (xhr.status !== 200) {
			console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
			return;
	    } 
		const data = JSON.parse(xhr.responseText);
		node.querySelector('.error-message').textContent = data.error ? data.message : `Пользователь ${data.name} успешно ${mess}`;
	}
}

document.querySelector('.sign-in-htm').addEventListener('submit', event => { 
	event.preventDefault(); 
	onSubmit(event.target, 'https://neto-api.herokuapp.com/signin', 'авторизован');
});
document.querySelector('.sign-up-htm').addEventListener('submit', event => {
	event.preventDefault();
	onSubmit(event.target, 'https://neto-api.herokuapp.com/signup', 'зарегистрирован');
});