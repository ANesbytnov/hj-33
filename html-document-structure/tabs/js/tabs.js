/*jshint esversion: 6*/ 
"use strict";

function onLoad() {
  const tabs = document.querySelector('#tabs');
  const tabNavs = tabs.querySelector('.tabs-nav');
  const template = tabNavs.firstElementChild;

  [...tabs.querySelector('.tabs-content').children].forEach(function(curr) {
    const newTab = template.cloneNode(true);
    newTab.firstElementChild.textContent = curr.dataset.tabTitle;
    newTab.firstElementChild.classList.add(curr.dataset.tabIcon);
    tabNavs.appendChild(newTab);
  });
  template.remove();

  const hideAllContent = () => tabs.querySelectorAll('.tabs-content > :not(.hidden)').forEach(el => el.classList.add('hidden'));
  hideAllContent();

  [...tabNavs.children].forEach(el => el.addEventListener('click', function(e) {
    e.preventDefault();
    hideAllContent();
    if (tabs.querySelector('.ui-tabs-active')) {
      tabs.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
    }
    e.target.parentElement.classList.add('ui-tabs-active');
    tabs.querySelector(`.tabs-content > [data-tab-title="${e.target.textContent}"]`).classList.remove('hidden');
  }));

  tabNavs.firstElementChild.firstElementChild.click();
}

document.addEventListener('DOMContentLoaded', onLoad);