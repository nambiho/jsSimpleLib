'use strict';

console.log(1);
console.log(2);

document.body.appendChild(async function () {
	return document.createElement('div').textContent = 'ddd';
});