/*jshint esversion: 6*/ 
"use strict";

function onLoad() {
  const content = document.querySelector('#content');
  const pre = document.querySelector('#preloader');
  const preToggleHidden = () => pre.classList.toggle('hidden');

  document.querySelectorAll('nav > a').forEach(a => a.addEventListener('click', function(e) {  	
  	e.preventDefault();
  	if (e.target.classList.contains('active')) { // Если мы кликнули на активную вкладку, то ничего не делаем
  		return;
  	}
  	document.querySelector('nav > a.active').classList.remove('active');
  	e.target.classList.add('active');

  	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", onLoad);
	xhr.addEventListener("loadstart", preToggleHidden);
	xhr.addEventListener("loadend", preToggleHidden);
	xhr.open("GET", e.target.href);
	xhr.send();

	function onLoad() {
	  if (xhr.status !== 200) {
	    console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
	  } else {
	  	content.innerHTML = xhr.responseText;
	  }
	}

  }));
}

document.addEventListener('DOMContentLoaded', onLoad);