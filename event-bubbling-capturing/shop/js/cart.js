'use strict';

document.querySelector('.items-list').addEventListener('click', function(event) {
	const node = event.target;

	if (node.classList.contains('add-to-cart')) {
		event.stopPropagation();
		addToCart({
			"title": node.dataset.title,
			"price": node.dataset.price
		});
	}
});