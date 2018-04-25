'use strict';

export default function ajax (options) {
	const Super = this;
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

	class ajaxProcess {
		constructor (options) {
			this.settings = Super.util.merge({}, options);
			this.url = this.settings.url||'';
			this.http = getHttp();
			this.setOption();
			return this
		}

		send (resolve, reject) {
			this.then(() => {
				this.http.send()
			});
		}

		getOption (optionName) {
			return this.settings[optionName];
		}

		setOption (...option) {
			
		}
	}

	return new ajaxProcess(options);
}