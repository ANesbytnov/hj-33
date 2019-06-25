/*jshint esversion: 6*/ 
'use strict';

const onErrorReq = (xhr) => console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);

function getData(url, callback) {
	const xhr = new XMLHttpRequest();	
	xhr.addEventListener("load", e => xhr.status !== 200 ? onErrorReq(xhr) : callback(JSON.parse(xhr.responseText)));
	xhr.open('GET', url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
}

const renderColor = (color, index) =>
	`	<div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
		  <div class="tooltip">${color.title}</div>
		  <input quickbeam="color" id="swatch-${index}-${color.type}" type="radio" name="color" value="${color.type}" ${color.isAvailable ? '' : 'disabled'}>
		  <label for="swatch-${index}-${color.type}" style="border-color: ${color.code};">
		    <span style="background-color: ${color.code};"></span>
		    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
		  </label>
		</div>
	`;

const renderSize = (size, index) =>
	`	<div data-value="${size.type}" class="swatch-element plain ${size.type} ${size.isAvailable ? 'available' : 'soldout'}">
		  <input id="swatch-${index}-${size.type}" type="radio" name="size" value="${size.type}" ${size.isAvailable ? '' : 'disabled'}>
		  <label for="swatch-${index}-${size.type}">
		    ${size.title}
		    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
		  </label>
		</div>
	`;

const renderCartProduct = (swatch, index) =>	
	`	<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${swatch.id}" style="opacity: 1;">
		  <div class="quick-cart-product-wrap">
		    <img src="${swatch.pic}" title="${swatch.title}">
		    <span class="s1" style="background-color: #000; opacity: .5">$${swatch.price.toFixed(2)}</span>
		    <span class="s2"></span>
		  </div>
		  <span class="count hide fadeUp" id="quick-cart-product-count-${swatch.id}">${swatch.quantity}</span>
		  <span class="quick-cart-product-remove remove" data-id="${swatch.id}"></span>
		</div>
	`;

const renderCart = (count, sum) =>
	`	<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${count > 0 ? "open" : ""}">
		  <span>
		    <strong class="quick-cart-text">Оформить заказ<br></strong>
		    <span id="quick-cart-price">$${sum.toFixed(2)}</span>
		  </span>
		</a>
	`;

function onCartAnswer(event) {
	const xhr = event.target;
	if (xhr.status !== 200) {
		onErrorReq(xhr);
		return;
    } 
	const data = JSON.parse(xhr.responseText);
	data.error ? alert(data.message) : updateCart(data);
}		


const totalSumCart = data => data.reduce((sum, swatch) => sum + swatch.price * swatch.quantity, 0);
const updateCart = data => {
	window['quick-cart'].innerHTML = data.map(renderCartProduct).join('') + renderCart(data.length, totalSumCart(data));
	window['quick-cart'].querySelectorAll('.remove').forEach(elem => elem.addEventListener('click', function(event) {
		const node = event.target;
		const xhr = new XMLHttpRequest();
		const fData = new FormData();
		fData.append('productId', node.dataset.id);
		
		xhr.addEventListener("load", onCartAnswer);
		xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
		xhr.send(fData);
	}));
};

document.addEventListener('DOMContentLoaded', function(event) {

	getData('https://neto-api.herokuapp.com/cart/colors', function(data) {
		colorSwatch.innerHTML = data.map(renderColor).join('');
		if (localStorage.color) {
			const defaultInput = colorSwatch.querySelector(`.available > input[value="${localStorage.color}"]`);
			if (defaultInput !== null) {
				defaultInput.checked = true;	
			}
		}
		colorSwatch.querySelectorAll('input[type="radio"]').forEach(inp => inp.addEventListener('change', e => localStorage.color = inp.value));
	});
	
	getData('https://neto-api.herokuapp.com/cart/sizes', function(data) {
		sizeSwatch.innerHTML = data.map(renderSize).join('');
		if (localStorage.size) {
			const defaultInput = sizeSwatch.querySelector(`.available > input[value="${localStorage.size}"]`);
			if (defaultInput !== null) {
				defaultInput.checked = true;	
			}
		}
		sizeSwatch.querySelectorAll('input[type="radio"]').forEach(inp => inp.addEventListener('change', e => localStorage.size = inp.value));
	});

	getData('https://neto-api.herokuapp.com/cart', data => updateCart(data));


	AddToCartForm.addEventListener('submit', function(event) {
		const node = event.target;
		event.preventDefault();

		const xhr = new XMLHttpRequest();
		const fData = new FormData(node);
		fData.append('productId', node.dataset.productId);
		
		xhr.addEventListener("load", onCartAnswer);
		xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
		xhr.send(fData);
	});
});
