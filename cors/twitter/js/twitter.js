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
	document.querySelector('[data-wallpaper]').src = data.wallpaper;
	document.querySelector('[data-username]').innerText = data.username;
	document.querySelector('[data-description]').innerText = data.description;
	document.querySelector('[data-pic]').src = data.pic;
	document.querySelector('[data-tweets]').innerText = data.tweets;
	document.querySelector('[data-followers]').innerText = data.followers;
	document.querySelector('[data-following]').innerText = data.following;
}

document.addEventListener('DOMContentLoaded', e => {
	loadData('https://neto-api.herokuapp.com/twitter/jsonp')
		.then(setData);
});
