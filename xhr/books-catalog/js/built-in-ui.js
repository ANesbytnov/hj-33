/* Данный JS код */
/*jshint esversion: 6*/ 
"use strict";

const renderLi = (el) => `
  <li data-title="${el.title}" data-author="${el.author.name}" data-info="${el.info}" data-price="${el.price}">
    <img src="${el.cover.small}">
  </li>`;

function onLoad() {
  const content = document.querySelector('#content');

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.open("GET", 'https://neto-api.herokuapp.com/book/');
  xhr.send();

  function onLoad() {
    if (xhr.status !== 200) {
      console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
    } else {
      content.innerHTML = JSON.parse(xhr.responseText).map(renderLi).join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', onLoad);

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});
