export default function ajax (opts) {
	'use strict';

	//simplelib
	const Super = this;
	
	let options = Super.util.merge({
		url: '',
		type: 'GET',
		async: true,
		data: null,
		dataType: 'html',
		success: null,
		fail: null,
		timeout: null,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}, opts);

	function getSerialize (data) {
		data = data || {};
		var returnVal = [];
		Object.keys(data).forEach(function (name) {
			returnVal.push(name + '=' + data[name])
		});
		return returnVal.join('&')
	}

	function getURL (options, data='') {
		if ((options.type.toUpperCase(options.url) !== 'GET') || (data == '')) return options.url
		var url = options.url;
		if (/([?][\w\W]*)/.test(url)) url += '&' + data;
		else url += '?' + data;
		return url.replace(/[&?]{1,2}/, '&');
	}

	function parseData (xhr) {
		switch(options.dataType) {
			case 'json':
				return Super.util.isJsonString(xhr.responseText)
					? JSON.parse(xhr.responseText)
					: xhr.responseText
			case 'xml':
				return xhr.responseXML
			default:
				return xhr.responseText
		}
	}
	function getXHR () {
		var x = null;
		return x = new XMLHttpRequest(),
		(!x && window.XDomainRequest) && (x = new XDomainRequest()),
		x;
	}

	function request (resolve, reject) {
		var xhr = getXHR(),

		protocol = /([\w]+:)\/\//.test(options.url) ? RegExp.$1 : location.protocol,
		
		hostTest = /([\w]+:)\/\/([^\/]+)/.test(options.url),

		host = RegExp.$2 || location.host,
		
		cross = RegExp.$2 && RegExp.$2 === location.host,

		data = getSerialize(options.data),

		url = getURL(options, data),

		abortTimeout = null
		;

		for (let key in options.headers) xhr.setRequestHeader(key, options.headers[key])
		if (cross) {
			xhr.setRequestHeader('X-Requested', 'X-Response');
			// for Cookie : ie10+
			xhr.withCredentials && (xhr.withCredentials = true);
		}

		xhr.open(options.type, url, options.async!==false);
		
		xhr.onreadystatechange = (e) => {
			if (xhr.readyState == 4) {
				clearTimeout(abortTimeout);
				if (xhr.status == 200) resolve&&resolve(parseData(xhr), 'success', xhr);
				else reject&&reject(xhr.status, 'fail', xhr)
			}
		}
		
		if (options.timeout|0 > 0) {
			abortTimeout = setTimeout(function () {
				clearTimeout(abortTimeout);
				xhr.abort();
				options.fail&&options.fail(xhr.status, 'timeout', xhr)
			}, options.timeout);
		}

		xhr.send(options.data||null);
	}

	
	let promise = new Super.Promise(request);
	Super.util.proto(promise, {
		options: options
	});
	
	return promise.then(options.success, options.fail);
}

export function get (url, success, fail) {
	'use strict';
	return this.ajax({
		url: url,
		success: success,
		fail: fail
	})
}

export function post (url, data, success, fail) {
	'use strict';
	return this.ajax({
		url: url,
		type: 'post',
		success: success,
		fail: fail,
		data: data
	})
}