'use strict';

document.addEventListener('DOMContentLoaded', function() {
	const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

	connection.addEventListener('open', event => {
		connection.addEventListener('message', event => {
			console.log(`Получено сообщение: ${event.data}`);
			const data = JSON.parse(event.data);
			document.querySelector('.counter').innerText = data.connections;
			document.querySelector('.errors').innerText = data.errors;
		});

		window.addEventListener("beforeunload", event => {
			connection.onclose = function() {};
			connection.close(1000, 'Работа закончена');
		});
	});
});