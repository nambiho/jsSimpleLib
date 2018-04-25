'use strict';
const typeOptions = {};
export default function ajax (options) {
	function getHttp () {
		var cHttp = new XMLHttpRequest();
		if (window.XDomainRequest) cHttp = new XDomainRequest();
		return cHttp||null;
		
		// if (cHttp) {
		// 	/**
		// 	 * res.writeHead(200, {
		// 	 * 'Content-Type': 'text/html; charset=utf-8',
		// 	 * 'Access-Control-Allow-Origin': 'http://localhost:8080',
		// 	 * 'Access-Control-Allow-Credentials': true,
		// 	 * 'Access-Control-Allow-Headers': 'X-Custom-Header'
		// 	 * });
		// 	 */

		// 	cHttp.open('get', 'http://localhost:9000', true);
		// 	cHttp.withCredentials = true; //ie10+
		// 	cHttp.setRequestHeader('X-Request-Header', 'XRequest');
		// 	cHttp.onreadystatechange = function () {console.log(cHttp.readyState)};
		// 	cHttp.onload = function () {console.log('onload')}
		// 	cHttp.onerror = function () {console.log('onerror')}
		// 	cHttp.send();
		// }
	}

	//TO-DO
	return function ajaxProcess(){}
}