"use strict";

console.log("Hello, World");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
  .then(function () {
    console.log("Service Worker registered");
  });
}