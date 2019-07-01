/*jshint esversion: 6*/ 
'use strict';

const randomName = () => 'rand' + Math.round(1000 * Math.random());

function loadData(url) {
	const functionName = randomName();
	return new Promise ((done, fail) => {
		window[functionName] = done;
		const script = document.createElement('script');
		script.src = `${url}?callback=${functionName}`;
		document.body.appendChild(script);
	});
}

const id = 42;

function setReceipt(data) {
	document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
	document.querySelector('[data-title]').innerText = data.title;
	document.querySelector('[data-ingredients]').innerText = data.ingredients.join(', ');

	loadData(`https://neto-api.herokuapp.com/food/${id}/rating`)
		.then(setRating);
}

function setRating(data) {
	document.querySelector('[data-rating]').innerText = data.rating.toFixed(2);
	document.querySelector('[data-votes]').innerText = `(${data.votes} оценок)`;

	loadData(`https://neto-api.herokuapp.com/food/${id}/consumers`)
		.then(setConsumers);
}

const renderConsumer = data => `<img src="${data.pic}" title="${data.name}">`;

const setConsumers = data => document.querySelector('[data-consumers]').innerHTML = 
		data.consumers.map(renderConsumer).join('') + `<span>(+${data.total - data.consumers.length})</span>`;

document.addEventListener('DOMContentLoaded', e => {
	loadData(`https://neto-api.herokuapp.com/food/${id}`)
		.then(setReceipt);
});
