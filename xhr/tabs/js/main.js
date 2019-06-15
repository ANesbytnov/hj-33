/*jshint esversion: 6*/ 
"use strict";

function onLoad() {
  const content = document.querySelector('#content');
  const pre = document.querySelector('#preloader');
  const preToggleHidden = () => pre.classList.toggle('hidden');
  const xhr = new XMLHttpRequest();
  const xhrOnLoad = () => xhr.status !== 200 ? console.log(`Ответ ${xhr.status}: ${xhr.statusText}`) : content.innerHTML = xhr.responseText;

  function xhrRequest(e) {
	xhr.addEventListener("load", xhrOnLoad);
	xhr.addEventListener("loadstart", preToggleHidden);
	xhr.addEventListener("loadend", preToggleHidden);
	xhr.open("GET", e.target.href);
	xhr.send();  	
  }

  function activeTab(e) {
  	document.querySelector('nav > a.active').classList.remove('active');
  	e.target.classList.add('active');  	
  }

  document.querySelectorAll('nav > a').forEach(a => a.addEventListener('click', function(e) {  	
  	e.preventDefault();
  	xhrRequest(e);
  	activeTab(e);
  }));

  document.querySelector("nav > a.active").click();
}

document.addEventListener('DOMContentLoaded', onLoad);