'use strict';

document.addEventListener('DOMContentLoaded', function() {
	const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

	connection.addEventListener('open', event => {
		showBubbles(connection);
		document.addEventListener('click', event => 
			connection.send(JSON.stringify({
				x: event.pageX,
				y: event.pageY
			})
		));
	});
});