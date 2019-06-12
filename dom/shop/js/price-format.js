/*jshint esversion: 6*/ 
"use strict";

function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

let count = 0;
let sum = 0;

function init() {
	document.querySelectorAll('.add').forEach(buAdd => buAdd.addEventListener('click', function(e) {
		document.querySelector('#cart-count').innerHTML = ++count;
		document.querySelector('#cart-total-price').innerHTML = getPriceFormatted(sum += +e.target.dataset.price);
	}));
}

document.addEventListener('DOMContentLoaded', init);