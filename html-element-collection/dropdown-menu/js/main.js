/*jshint esversion: 6*/
"use strict";
[...document.getElementsByClassName('wrapper-dropdown')].forEach((el) => el.onclick = function() { this.classList.toggle('active'); });