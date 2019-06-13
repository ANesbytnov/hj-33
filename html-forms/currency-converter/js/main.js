/*jshint esversion: 6*/ 
"use strict";


function onLoad() {
  const content = document.querySelector('#content');
  const loader = document.querySelector('#loader');
  const source = document.querySelector('#source');
  const from = document.querySelector('#from');
  const to = document.querySelector('#to');
  const result = document.querySelector('#result');

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.addEventListener("loadstart", loadStart);
  xhr.addEventListener("loadend", loadEnd);
  xhr.open("GET", 'https://neto-api.herokuapp.com/currency');
  xhr.send();

  const recalc = () => result.innerHTML = (+source.value * from.value / to.value).toFixed(2);

  function onLoad() {
    if (xhr.status !== 200) {
      console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
    } else {
      const options = JSON.parse(xhr.responseText).map(el => `<option value='${el.value}' title='${el.title}'>${el.code}</option>`);
      from.innerHTML = options;
      to.innerHTML = options;

      source.addEventListener('input', recalc);
	  from.addEventListener('change', recalc);
	  to.addEventListener('change', recalc);

	  recalc();

    }
  }

  function loadStart() {
  	loader.classList.remove('hidden');
  	content.classList.add('hidden');
  }

  function loadEnd() {
  	loader.classList.add('hidden');
  	content.classList.remove('hidden');
  }

}

document.addEventListener('DOMContentLoaded', onLoad);