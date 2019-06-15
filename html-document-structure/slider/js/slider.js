/*jshint esversion: 6*/ 
"use strict";

function onLoad() {
  const slider = document.querySelector('.slider');
  const prev = slider.querySelector('[data-action="prev"]');
  const first = slider.querySelector('[data-action="first"]');
  const next = slider.querySelector('[data-action="next"]');
  const last = slider.querySelector('[data-action="last"]');
  
  function moveSlide(e) {
    if (e.target.classList.contains('disabled') || slider.querySelector('.slide-current') === null) {
      return;
    }

    const currSlide = slider.querySelector('.slide-current');
    let newSlide = null;
    switch (e.target.dataset.action) {
      case 'prev':
        newSlide = currSlide.previousElementSibling;
        break;
      case 'next':
        newSlide = currSlide.nextElementSibling;
        break;
      case 'first':
        newSlide = currSlide.parentElement.firstElementChild;
        break;
      case 'last':
        newSlide = currSlide.parentElement.lastElementChild;
        break;
    }

    if (newSlide === null) {
      return;
    }

    currSlide.classList.remove('slide-current');
    newSlide.classList.add('slide-current');

    prev.disabled = newSlide.previousElementSibling === null;
    first.disabled = newSlide.previousElementSibling === null;
    next.disabled = newSlide.nextElementSibling === null;
    last.disabled = newSlide.nextElementSibling === null;

    if (prev.disabled) {
      prev.classList.add('disabled');
      first.classList.add('disabled');
    } else {
      prev.classList.remove('disabled');
      first.classList.remove('disabled');
    }

    if (next.disabled) {
      next.classList.add('disabled');
      last.classList.add('disabled');
    } else {
      next.classList.remove('disabled');
      last.classList.remove('disabled');
    }
  }

  function initSlider() {
    slider.querySelectorAll('.slider-nav > a').forEach(el => el.addEventListener('click', moveSlide));
    slider.querySelector('.slide').classList.add('slide-current');
    prev.classList.add('disabled');
    first.classList.add('disabled');
    prev.disabled = true;
    first.disabled = true;
  }

  initSlider();  
}

document.addEventListener('DOMContentLoaded', onLoad);