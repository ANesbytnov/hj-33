/*jshint esversion: 6*/ 
"use strict";

function onLoad() {
  const todo = document.querySelector('.todo-list');
  todo.querySelectorAll('input[type="checkbox"]').forEach(inp => inp.addEventListener('change', function(e) {
    const pa = e.target.parentElement;
    const grandpa = pa.parentElement;
    if (grandpa.classList.contains('done')) {
      todo.querySelector('.undone').appendChild(pa);
    } else {
      if (grandpa.classList.contains('undone')) {
        todo.querySelector('.done').appendChild(pa);
      }
    }
  }));
}

document.addEventListener('DOMContentLoaded', onLoad);