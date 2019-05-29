/*jshint esversion: 6*/
"use strict";
[...document.getElementsByClassName('drum-kit__drum')].forEach((el) => el.onclick = function() { this.getElementsByTagName('audio')[0].play(); });