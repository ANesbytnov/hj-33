/*jshint esversion: 6*/ 
'use strict';

document.addEventListener('DOMContentLoaded', function() {
	const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

	const chat = document.querySelector('.chat');
	const chatStatus = chat.querySelector('.chat-status');
	const messSubmit = chat.querySelector('.message-submit');
	const messContent = chat.querySelector('.messages-content');
	const messTemplates = chat.querySelector('.messages-templates');
	const messBox = chat.querySelector('.message-box');
	const messInput = messBox.querySelector('input.message-input');

	const PERSONAL = '.message-personal';
	const STATUS = '.message-status';
	const LOADING = '.loading';
	const TIMESTAMP = '.timestamp';

	const zeroPad = num => num < 10 ? '0' + num : num;


	function addMess(messClass, text) {
		const rule = messClass === '' ? 'div[class="message"]' : '.message' + messClass;
		const mess = messTemplates.querySelector(rule).cloneNode(true);
		
		mess.querySelector('.message-text').innerText = text;
		
		if (mess.querySelector(TIMESTAMP)) {
			const today = new Date();
			mess.querySelector(TIMESTAMP).innerText = zeroPad(today.getHours()) + ":" + zeroPad(today.getMinutes());
		}
		
		messContent.appendChild(mess);
		mess.scrollIntoView();
	}

	function removeMess(messClass) {
		if (messContent.querySelector(messClass)) {
			messContent.querySelector(messClass).remove();
		}
	}

	function openChat() {
		chatStatus.innerText = chatStatus.dataset.online;
		messSubmit.disabled = false;
		addMess(STATUS, 'Пользователь появился в сети');
	}

	function closeChat() {
		console.log('Вебсокет-соединение закрыто');
		chatStatus.innerText = chatStatus.dataset.offline;
		messSubmit.disabled = true;
	}

	const sendMess = event => {
		event.preventDefault();
		if (messInput.value !== '') {
			connection.send(messInput.value);
			addMess(PERSONAL, messInput.value);
			messInput.value = '';
		}
	};


	connection.addEventListener('open', event => {
		openChat();

		connection.addEventListener('message', event => {
			const data = event.data;
			console.log(`Получено сообщение: ${data}`);

			if (data === '...') {
				addMess(LOADING, '');
			} else {
				removeMess(LOADING);
				addMess('', data);
			}

		});

		connection.addEventListener('close', closeChat);

		messBox.addEventListener('submit', sendMess);

	});
});