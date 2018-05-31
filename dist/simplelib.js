(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.simplelib = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ajax;
exports.get = get;
exports.post = post;
function ajax(opts) {
	'use strict';

	//simplelib

	var Super = this;

	var options = Super.util.merge({
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

	function getSerialize(data) {
		data = data || {};
		var returnVal = [];
		Object.keys(data).forEach(function (name) {
			returnVal.push(name + '=' + data[name]);
		});
		return returnVal.join('&');
	}

	function getURL(options) {
		var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

		if (options.type.toUpperCase(options.url) !== 'GET' || data == '') return options.url;
		var url = options.url;
		if (/([?][\w\W]*)/.test(url)) url += '&' + data;else url += '?' + data;
		return url.replace(/[&?]{1,2}/, '&');
	}

	function parseData(xhr) {
		switch (options.dataType) {
			case 'json':
				return Super.util.isJsonString(xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.responseText;
			case 'xml':
				return xhr.responseXML;
			default:
				return xhr.responseText;
		}
	}
	function getXHR() {
		var x = null;
		return x = new XMLHttpRequest(), !x && window.XDomainRequest && (x = new XDomainRequest()), x;
	}

	function request(resolve, reject) {
		var xhr = getXHR(),
		    protocol = /([\w]+:)\/\//.test(options.url) ? RegExp.$1 : location.protocol,
		    hostTest = /([\w]+:)\/\/([^\/]+)/.test(options.url),
		    host = RegExp.$2 || location.host,
		    cross = RegExp.$2 && RegExp.$2 === location.host,
		    data = getSerialize(options.data),
		    url = getURL(options, data),
		    abortTimeout = null;

		for (var key in options.headers) {
			xhr.setRequestHeader(key, options.headers[key]);
		}if (cross) {
			xhr.setRequestHeader('X-Requested', 'X-Response');
			// for Cookie : ie10+
			xhr.withCredentials && (xhr.withCredentials = true);
		}

		xhr.open(options.type, url, options.async !== false);

		xhr.onreadystatechange = function (e) {
			if (xhr.readyState == 4) {
				clearTimeout(abortTimeout);
				if (xhr.status == 200) resolve && resolve(parseData(xhr), 'success', xhr);else reject && reject(xhr.status, 'fail', xhr);
			}
		};

		if (options.timeout | 0 > 0) {
			abortTimeout = setTimeout(function () {
				clearTimeout(abortTimeout);
				xhr.abort();
				options.fail && options.fail(xhr.status, 'timeout', xhr);
			}, options.timeout);
		}

		xhr.send(options.data || null);
	}

	var promise = new Super.Promise(request);
	Super.util.proto(promise, {
		options: options
	});

	return promise.then(options.success, options.fail);
}

function get(url, success, fail) {
	'use strict';

	return this.ajax({
		url: url,
		success: success,
		fail: fail
	});
}

function post(url, data, success, fail) {
	'use strict';

	return this.ajax({
		url: url,
		type: 'post',
		success: success,
		fail: fail,
		data: data
	});
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var bInfo = exports.bInfo = function (nav) {
	'use strict';

	var b = nav.userAgent.toLowerCase(),
	    ie = /msie [6-8]/.test(b),
	    ie9 = /msie 9/.test(b),
	    ie10 = /msie 10/.test(b),
	    ie11 = /(trident\/)(rv:11)/.test(b),
	    edge,
	    chrome = /chrome\//.test(b) && /safari\//.test(b),
	    opera = !chrome && /opr\/|opera\//.test(b),
	    safari = !opera && !chrome && /safari/.test(b),
	    firefox = /firefox/.test(b),
	    whale = /whale/.test(b);
	return {
		isChrome: chrome, isSafari: safari, isIE11: ie11, isIE10: ie10, isIE9: ie9,
		isOpera: opera, isFirefox: firefox, isWhale: whale, ieMore: ie, ios: /iphone|ipad/.test(b)
	};
}(navigator);

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loader;
function loader(jsURL, fn, option) {
	'use strict';

	/**
  * Worker does not support.
  * The only parent element is document.head.
  * 
  * jsURL : url string, Array or String
  * fn : function
  * option : TO-DO
  */

	var _this = this;

	jsURL = this.util.isArray(jsURL) ? jsURL : Array(jsURL);
	var train = Array(),
	    complete = Array(),
	    next = this.util.isFunction(fn) && fn || this.util.noop;

	var location_src = function location_src(src, cache) {
		var returnVal = src,
		    d = /\?/.test(src);
		returnVal += cache ? '' : (d ? '&' : '?') + 't=' + _this.util.dateFormat(new Date(), 'yyyymmddss');
		return returnVal;
	};

	var load = function load(entry) {
		if (!entry.url) return;
		_this.util.createElement({
			dom: "script",
			attr: {
				src: location_src(entry.url, false),
				charset: 'utf-8',
				type: 'text/javascript'
			},
			event: {
				load: function load(e) {
					entry.complete = true;
				},
				error: function error(e) {
					throw new Error(entry.url + ' : script loading error');
				}
			},
			parent: document.head
		});
	};

	jsURL.forEach(function (url, idx) {
		complete.push(false);
		train.push(_this.util.object({ index: idx, url: url }, {
			complete: {
				set: function set(val) {
					complete[this.index] = val;
					if (complete.indexOf(false) === -1) {
						next();
					}
				}
			}
		}));
	});

	train.forEach(function (entry, idx) {
		load(entry);
	});
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = runtask;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function runtask(options) {
	'use strict';
	/*
 option = {
 	async : true | false [default is true],
 	tasks : [{
 		func: function
 		object: thisArg
 		argv: arguments
 	}]
 }
 */

	var Super = this;
	function _convertArray(source) {
		var tmp = [];
		if (Super.util.isArray(source)) {
			tmp = tmp.concat(source);
		} else if (Super.util.isJSON(source)) {
			tmp = tmp.concat([source]);
		} else if (Super.util.isFunction(source)) {
			tmp = [{ func: source }];
		}
		return tmp;
	}

	var QUEUE = function () {
		function QUEUE(source, filter) {
			_classCallCheck(this, QUEUE);

			this.data = [];
			this.push(source);
			this.filter = filter;
		}

		_createClass(QUEUE, [{
			key: 'push',
			value: function push(source) {
				var tmp = _convertArray(source);
				if (this.filter) tmp = this.filter(tmp);
				this.data = this.data.concat(tmp);
			}
		}, {
			key: 'pop',
			value: function pop() {
				if (this.length == 0) return;
				return this.data.shift();
			}
		}, {
			key: 'length',
			get: function get() {
				return this.data.length;
			}
		}, {
			key: 'isEmpty',
			get: function get() {
				return this.length === 0;
			}
		}]);

		return QUEUE;
	}();

	var qu = new QUEUE(options.tasks || [], function (src) {
		return src.filter(function (entry) {
			return 'func' in entry && Super.util.isFunction(entry.func);
		});
	}),
	    tOut = void 0,
	    active = false,
	    isPromise = window.Promise && Super.util.isNative(Promise),
	    promise = isPromise && Super.util.delay(5);

	var apply = function apply(func, object, argv) {
		return function () {
			return func.apply(object, Super.util.isArray(argv) ? argv : [argv]);
		};
	};

	var process = function taskRunProcess() {
		if (qu.isEmpty) {
			active = false;return;
		}
		var proc, argv;
		while (1) {
			if (!(proc = qu.pop())) {
				active = false;return;
			}
			if (Super.util.isFunction(proc.func)) {
				argv = Super.util.isArray(proc.argv) ? proc.argv : [proc.argv];
				if (isPromise) promise && promise.then(apply(proc.func, proc.object || null, argv));else apply(proc.func, proc.object || null, argv)();
			}
		}
	};

	// nextTick을 보장 할 수 있는 솔루션을 만들어야한다.
	var object = Super.util.object({
		async: options.async !== false,
		add: function add(tasks) {
			qu.push(tasks);
			return this;
		},
		run: function run(tasks) {
			tasks && qu.push(tasks);
			if (!active) {
				if (this.async) {
					active = true;
					if (isPromise) process();else setTimeout(process, 10);
				} else process();
			}
			return this;
		}
	});

	Object.freeze(object);

	return object;
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _version = require('./version');

var _binfo = require('./binfo');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _runtask = require('./runtask');

var _runtask2 = _interopRequireDefault(_runtask);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _slPromise = require('./slPromise');

var _slPromise2 = _interopRequireDefault(_slPromise);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var locale = {
	date: {
		week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	}
};

var simplelib = function simplelib() {
	var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	_classCallCheck(this, simplelib);

	opt.locale = _util2.default.merge(opt.locale || {}, locale);
	this.option = _util2.default.merge({}, opt);
	this.util = (0, _util.set)(this);
	this.bInfo = _binfo.bInfo;
	this.version = _version.Version;
};

_util2.default.proto(simplelib, {
	ajax: _ajax2.default,
	runtask: _runtask2.default,
	loader: _loader2.default,
	Promise: _slPromise2.default,
	get: _ajax.get,
	post: _ajax.post
});

exports.default = simplelib;

if (module) module.exports = simplelib;

},{"./ajax":1,"./binfo":2,"./loader":3,"./runtask":4,"./slPromise":6,"./util":7,"./version":8}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Promise = function (global, factory) {

	//return global.Promise||factory();
	return factory();
}(typeof global != 'undefined' ? global : undefined || window, function () {
	'use strict';

	//*

	function getArguments(arg) {
		return Array.prototype.slice.call(arg);
	}

	function promiseCallBackFunction() {
		// parent defer
		var that = this;
		return function (onResolve, onReject) {
			if (status === 0) {
				try {
					onResolve(null);
				} catch (e) {
					onReject(null, getArguments(e));
				}
			}
		};
	}

	function rejectHandler(r) {
		console.error(r);
	}

	var active = false;

	// function run (f) {
	// 	chain.push(f);
	// 	if (!active) {
	// 		active = setTimeout(function () {
	// 			var task = chain.shift();
	// 			while (task) {
	// 				task && (argv = [task.apply(null, argv)]);
	// 				task = chain.shift();
	// 			}
	// 			active = false;
	// 		}, 5);
	// 	}
	// }
	function run(defer) {
		if (!active) {
			active = setTimeout(function () {
				var task = defer.status === 1 ? defer.resolve : defer.reject;
				if (task) {
					task.apply(defer, defer.argv);
				} else {}
			}, 5);
		}
	}

	var $Promise = function Promise(executor) {
		if (!this || this.constructor !== Promise) throw Error('Not a Promise');
		if (typeof executor !== 'function') throw TypeError('Not a Function');

		var defer = new Defer(this);

		PromiseInit(this, defer);

		executor(function executorResolver() {
			PromiseResolve(defer, getArguments(arguments));
		}, function executorRejector() {
			PromiseReject(defer, getArguments(arguments));
		});
	};

	function PromiseInit(that, defer) {
		that.then = function (onResolve, onReject) {
			defer.resolve = onResolve;
			defer.reject = onReject;
			//active = true;
			run(defer);

			// if (status === 1) {
			// 	if (onResolve) {
			// 		run(onResolve);
			// 		status = 0;
			// 	}
			// } else if (status === -1) {
			// 	if (onReject) {
			// 		run(onReject);
			// 		status = 0;
			// 	}
			// }

			var promise = new Promise(promiseCallBackFunction.call(defer));
			return promise;
		};
		that.catch = function (onReject) {
			return this.then(undefined, onReject);
		};
	}

	function PromiseResolve(defer, argv) {
		defer.argv = argv;
		defer.status = 1;
	}

	function PromiseReject(defer, argv) {
		defer.argv = argv;
		defer.status = -1;
	}

	function Defer(promise) {
		this.promise = promise;
		this.status = 0;
		this.argv = [];
		this.chain = [];
	}

	// Method
	$Promise.all = function () {};
	$Promise.race = function () {};
	$Promise.resolve = function () {};
	$Promise.reject = function () {};

	return $Promise;
	// */
});

exports.default = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.set = set;
var util = function util() {
	'use strict';

	var Super = this,
	    toString = Object.prototype.toString,
	    jsonctor = JSON.constructor,
	    noop = function noop() {};

	// is Functions
	var isArray = function isArray(x) {
		return Array.isArray(x); //(toString.call(x) === "[object Array]")
	},
	    isObject = function isObject(x) {
		if (!x) return false;
		if (!x.constructor) return false;
		return !x.constructor.name ? toString.call(x) === '[object Object]' : x.constructor.name === 'Object';
	},
	    isNative = function isNative(x) {
		return isFunction(x) && /native code/.test(x);
	},
	    isFunction = function isFunction(x) {
		return typeof x === "function";
	},
	    isString = function isString(x) {
		return typeof x === "string";
	},
	    isNull = function isNull(x) {
		return toString.call(x) === "[object Null]";
	},
	    isUndefined = function isUndefined(x) {
		return typeof x === "undefined";
	},
	    isFalse = function isFalse(x) {
		return isNull(x) || isUndefined(x) || x === "" || x === 0 || !x;
	},
	    isJSON = function isJSON(x) {
		return !!x && x.constructor === jsonctor;
	},
	    isJsonString = function isJsonString(x) {
		try {
			return JSON.parse(x) && !!x;
		} catch (e) {
			return false;
		}
	},
	    isDom = function isDom(x) {
		return x && !!x.nodeName;
	},
	    isPlain = function isPlain(x) {
		if (isFalse(x) || !isObject(x)) return false;
		var p = Object.getPrototypeOf(x);
		if (!p) return isJSON(x);
		var ctor = Object.hasOwnProperty.call(p, "constructor") && p.constructor;
		return isFunction(ctor) && isNative(ctor.toLocaleString());
	},
	    delay = function delay(ms) {
		return new Promise(function (resolve) {
			var tOut = setTimeout(function () {
				clearTimeout(tOut);
				resolve();
			}, ms);
		});
	},
	    dateFormat = function _dateFormat(agDate, fmt, bHour12, option) {
		if (isFalse(agDate)) return "";
		var typeof_date = toString.call(agDate);
		if (typeof_date !== "[object Date]") return "";

		var y = agDate.getFullYear(),
		    m = agDate.getMonth() + 1,
		    dt = agDate.getDate(),
		    d = agDate.getDay(),
		    h = agDate.getHours(),
		    n = agDate.getMinutes(),
		    s = agDate.getSeconds(),
		    zone = -(agDate.getTimezoneOffset() / 60),
		    hour24 = h,
		    hour12 = h > 12 ? Math.ceil(h / 12) : h,
		    ampm = h > 12 ? "PM" : "AM";

		return fmt.replace(/(yyyy|yy|mm|dd|m|d|hh|nn|ss|h|n|s|w|z)/gi, function (_1) {
			switch (_1) {
				case "yyyy":
					return y;
				case "yy":
					return ("" + y).substr(-2);
				case "mm":
					return ("0" + m).substr(-2);
				case "dd":
					return ("0" + d).substr(-2);
				case "m":
					return m;
				case "d":
					return dt;
				case "hh":
					return (bHour12 ? ampm + " " : "") + ("0" + (bHour12 ? hour12 : hour24)).substr(-2);
				case "nn":
					return ("0" + n).substr(-2);
				case "ss":
					return ("0" + s).substr(-2);
				case "h":
					return h;
				case "n":
					return n;
				case "ss":
					return ("0" + s).substr(-2);
				case "s":
					return s;
				//case "w": return lang((option&&option.langcode)||'').date.week[d];
				case "w":
					return Super && Super.option.locale.date.week[d] || '';
				case "z":
					return (zone > 0 ? "+" : "-") + zone;
			}
		});
	};

	// regexp Functions
	var trim = function trim(x) {
		return x.replace(/^[\s]+|[\s]+$/g, "");
	},
	    strPattern = function strPattern(d, c) {
		// d = json to be replace
		// {'test' : 'replace test'}
		// c = string to be changed
		// '{{@test}}'
		if (isString(d)) {
			c = d;d = this || {};
		}
		var a = /{{@([a-zA-Z0-9_@\. \*\^\$\#-]*)}}/g;
		return c.replace(a, function (e, f) {
			return isNull(d[f]) || isUndefined(d[f]) ? "" : d[f];
		});
	};

	// DOM Functions : a few
	var getbyId = function getbyId(s) {
		return (this && this.getElementById ? this : document).getElementById(s);
	},
	    getbyClassName = function getbyClassName(s) {
		return Array.prototype.slice.call((this && this.getElementsByClassName ? this : document).getElementsByClassName(s));
		// no support : ie
		//return Array.from(((this && this.getElementsByClassName) ? this : document).getElementsByClassName(s))
	},
	    getbyTagName = function getbyTagName(s) {
		return Array.prototype.slice.call((this && this.getElementsByTagName ? this : document).getElementsByTagName(s));
		// no support : ie
		//return Array.from(((this && this.getElementsByTagName) ? this : document).getElementsByTagName(s))
	},
	    getbyName = function getbyName(s) {
		return Array.prototype.slice.call((this && this.getElementsByName ? this : document).getElementsByName(s));
		// no support : ie
		//return Array.from(((this && this.getElementsByName) ? this : document).getElementsByName(s))
	},
	    query = function query(s) {
		var _ret = (this && this.querySelector ? this : document).querySelector(s);
		return _ret;
	},
	    queryall = function queryall(s) {
		var m = (this && this.querySelectorAll ? this : document).querySelectorAll(s);
		return isArray(m) ? m : Array.prototype.slice.call(m); //m.forEach
		// no support : ie
		//return Array.from(((this && this.querySelectorAll) ? this : document).querySelectorAll(s));
	},
	    style = function style(el, stl) {
		if (!isObject(stl)) return el;
		for (var x in stl) {
			el.style[x] = stl[x];
		}
	},
	    createElement = function createElement(info, obj) {
		/** 
   * info = {
  	dom:'div'
  	attr:{},
  	style:{},
  	event:{},
  	child:
  	html:'<span>createElement</span>'
  	text:'createElement',
  	parent:
  }
  */
		if (!info.dom) return null;
		var el = document.createElement(info.dom);
		for (var attr in info.attr) {
			el.setAttribute(attr, info.attr[attr]);
		}
		style(el, info.style);
		addEvent(el, function (event) {
			var ret = {};
			for (var ev in event) {
				isFunction(event[ev]) && (ret[ev] = event[ev]);
			}
			return ret;
		}(info.event));

		info.child ? el.appendChild(info.child) : info.html ? el.innerHTML = info.html : info.text && (el.textContent = info.text);
		info.parent && info.parent.appendChild(el);
		return el;
	},
	    getComputedStyle = function setElemMargin(elem, stylename) {
		if (!elem) return;
		var style = window.getComputedStyle(elem);
		if (!style) return;
		return !stylename ? style : style[stylename];
	},
	    addEvent = function addEvent(t, /*tp,*/ev, c) {
		var isListener = !!t.addEventListener;
		if (t && ev) {
			for (var tp in ev) {
				if (isFunction(ev[tp])) isListener ? t.addEventListener(tp, ev[tp] || noop, c || false) : t.attachEvent('on' + tp, ev[tp] || noop);
			}
		}
	},
	    removeEvent = function removeEvent(t, /*tp,*/ev) {
		var isListener = !!t.removeEventListener;
		if (t && ev) {
			for (var tp in ev) {
				if (isFunction(ev[tp])) isListener ? t.removeEventListener(tp, ev[tp] || noop) : t.dettachEvent('on' + tp, ev[tp] || noop);
			}
		}
	},
	    trigger = function _trigger(_obj, _eventtype) {
		var _browserEvent = function _browserEvent() {
			var ev = void 0;
			if (isFunction(Event)) {
				//typeof(Event) === 'function'
				ev = new Event(_eventtype, {
					bubbles: true,
					cancelBubble: true,
					cancelable: true
				});
			} else {
				ev = document.createEvent('Event');
				event.initEvent(_eventtype, true, true);
			}
			return ev;
		};

		if (_obj.dispatchEvent) _obj.dispatchEvent(_browserEvent());else _obj.fireEvent('on' + _eventtype);
	};

	// object Functions
	var copy = function copy(target, source) {
		var delPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		if (!source) return target;
		var rtype = isArray(source) ? [] : {},
		    result = isObject(target) ? target : rtype,
		    keys = Object.keys(source),
		    key = '';
		for (var i = 0; i < keys.length; i++) {
			key = keys[i];
			if (delPrefix || key.substr(0, delPrefix.length) === delPrefix) continue;
			var val = source[key],
			    x = isArray(val) ? [] : isPlain(val) ? {} : false;
			result[key] = x ? copy(x, val, delPrefix) : val;
		}
		return result;
	},
	    merge = function merge(target) {
		for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			source[_key - 1] = arguments[_key];
		}

		var result = target;
		source.forEach(function (el, idx) {
			!isFalse(source) && (result = copy(result, el));
		});
		return result || {};
	},
	    delPrefixMerge = function delPrefixMerge(target, delPrefix) {
		for (var _len2 = arguments.length, source = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
			source[_key2 - 2] = arguments[_key2];
		}

		var result = target;
		source.forEach(function (el, idx) {
			!isFalse(source) && (result = copy(result, el, delPrefix));
		});
		return result || {};
	},
	    object = function object(o, descriptor, extend) {
		return Object.create(merge({}, 0x5f, o, extend), descriptor);
	},
	    proto = function proto(obj, source) {
		if (!obj) return obj;
		isJSON(source) && Object.keys(source).forEach(function (key, idx) {
			obj.prototype ? obj.prototype[key] = source[key] : obj[key] = source[key];
		});
		return obj;
	};

	return {
		isObject: isObject,
		isNative: isNative,
		isArray: isArray,
		isFunction: isFunction,
		isString: isString,
		isNull: isNull,
		isUndefined: isUndefined,
		isDom: isDom,
		isFalse: isFalse,
		isJSON: isJSON,
		isJsonString: isJsonString,
		isPlain: isPlain,
		trim: trim,
		dateFormat: dateFormat,
		strPattern: strPattern,
		getbyId: getbyId,
		getbyClassName: getbyClassName,
		getbyTagName: getbyTagName,
		getbyName: getbyName,
		query: query,
		queryall: queryall,
		style: style,
		createElement: createElement,
		getComputedStyle: getComputedStyle,
		addEvent: addEvent,
		removeEvent: removeEvent,
		trigger: trigger,
		copy: copy,
		merge: merge,
		delPrefixMerge: delPrefixMerge,
		object: object,
		delay: delay,
		proto: proto,
		noop: noop
	};
};

exports.default = util();
function set(ns) {
	return util.call(ns);
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Version = exports.Version = '0.4.0';

},{}]},{},[5])(5)
});
