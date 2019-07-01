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

function setData(data) {
	document.querySelector('[data-name]').innerText = data.name;
	document.querySelector('[data-description]').innerText = data.description;
	document.querySelector('[data-pic]').src = data.pic;
	document.querySelector('[data-position]').innerText = data.position;
	document.querySelector('[data-technologies]').innerText = data.technologies;

	loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
		.then(setTech);
}

const renderBadge = elem => `<span class='devicons devicons-${elem}'></span>`;

const setTech = data => {
	document.querySelector('[data-technologies]').innerHTML = data.map(renderBadge).join('');
	document.querySelector('.content').style.display = 'initial';
}

document.addEventListener('DOMContentLoaded', e => {
	loadData('https://neto-api.herokuapp.com/profile/me')
		.then(setData);
});
