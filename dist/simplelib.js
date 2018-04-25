(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.simplelib = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = ajax;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ajax(options) {
	var Super = this;
	function getHttp() {
		var cHttp = new XMLHttpRequest();
		if (window.XDomainRequest) cHttp = new XDomainRequest();
		return cHttp || null;

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

	var ajaxProcess = function () {
		function ajaxProcess(options) {
			_classCallCheck(this, ajaxProcess);

			this.settings = Super.util.merge({}, options);
			this.url = this.settings.url || '';
			this.http = getHttp();
			this.setOption();
			return this;
		}

		_createClass(ajaxProcess, [{
			key: 'send',
			value: function send(resolve, reject) {
				var _this = this;

				this.then(function () {
					_this.http.send();
				});
			}
		}, {
			key: 'getOption',
			value: function getOption(optionName) {
				return this.settings[optionName];
			}
		}, {
			key: 'setOption',
			value: function setOption() {}
		}]);

		return ajaxProcess;
	}();

	return new ajaxProcess(options);
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var bInfo = exports.bInfo = function (nav) {
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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = lang;
function lang() {
	var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option.langcd;

	/**
  * DATE
  */
	var date = {};
	if (code === 'kr') {
		date.week = ['일', '월', '화', '수', '목', '금', '토'];
	} else if (code === 'en') {
		date.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	} else {
		date.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	}

	return {
		date: date
	};
}

},{}],4:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loader;
function loader(jsURL, fn, option) {
	var _this = this;

	/**
  * Worker does not support.
  * The only parent element is document.head.
  * 
  * jsURL : url string, Array or String
  * fn : function
  * option : TO-DO
  */

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

},{}],5:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = runtask;
function runtask(taskInfo) {
	/*
 taskInfo = {
 	async: true/false
 	func: function
 	object: thisArg
 	argv: arguments
 }
 */

	var QUEUE = [],
	    doneQUEUE = [],
	    Super = this;
	var getTasks = function getTasks(tasks) {
		var tmp = [];
		if (Super.util.isArray(tasks)) {
			tmp = tmp.concat(tasks);
		} else if (Super.util.isJSON(tasks)) {
			tmp = tmp.concat([tasks]);
		} else if (Super.util.isFunction(tasks)) {
			tmp = [{ func: tasks }];
		}
		tmp = tmp.filter(function (entry) {
			return 'func' in entry;
		});
		return tmp;
	};
	var apply = function apply(func, object, argv) {
		return function () {
			func.apply(object, Super.util.isArray(argv) ? argv : [argv]);
		};
	};
	var object = Super.util.object({
		add: function add(tasks) {
			var tmp = getTasks(tasks);
			QUEUE = QUEUE.concat(tmp);
			return this;
		},
		run: function run(tasks) {
			tasks && this.add(tasks);
			var proc = void 0,
			    argv = void 0;

			while (1) {
				if (QUEUE.length === 0) break;
				proc = QUEUE.splice(0, 1)[0], argv = Super.util.isArray(proc.argv) ? proc.argv : [proc.argv];
				if (Super.util.isFunction(proc.func)) {
					proc.async ? setTimeout(apply(proc.func, proc.object || null, argv), 40) : apply(proc.func, proc.object || null, argv)();
				}
				doneQUEUE.push(proc);
			}
			return this;
		}
	});
	Object.defineProperty(object, 'queue', {
		set: function set(tasks) {
			QUEUE = getTasks(tasks);
		},
		get: function get() {
			return QUEUE;
		}
	});
	Object.freeze(object);

	object.queue = taskInfo;
	return object;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _version = require('./version');

var _binfo = require('./binfo');

var _util = require('./util');

var _runtask = require('./runtask');

var _runtask2 = _interopRequireDefault(_runtask);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _lang = require('./lang');

var _lang2 = _interopRequireDefault(_lang);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const _util = util();
var simplelib = function simplelib(opt) {
	_classCallCheck(this, simplelib);

	this.option = _util.util.merge({}, opt);
	this.util = _util.util;
	this.bInfo = _binfo.bInfo;
	this.version = _version.Version;
	this.lang = _lang2.default;
};

_util.util.proto(simplelib, {
	ajax: _ajax2.default,
	runtask: _runtask2.default,
	loader: _loader2.default
});

exports.default = simplelib;

if (module) module.exports = simplelib;

},{"./ajax":1,"./binfo":2,"./lang":3,"./loader":4,"./runtask":5,"./util":7,"./version":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.util = undefined;

var _lang = require('./lang');

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = exports.util = function () {
	var toString = Object.prototype.toString,
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
		return x.indexOf("[native code]") > -1;
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
				case "w":
					return (0, _lang2.default)(option && option.langcode || '').date.week[d];
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
		// for(let ev in info.event){
		// 	isFunction(info.event[ev]) && addEvent(el, ev, info.event[ev])
		// }

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
		// t && tp && isFunction(ev) && (t.addEventListener ?
		// 	t.addEventListener(tp, ev || noop, c || false) :
		// 	t.attachEvent('on' + tp, ev || noop)
		// )
	},
	    removeEvent = function removeEvent(t, /*tp,*/ev) {
		var isListener = !!t.removeEventListener;
		if (t && ev) {
			for (var tp in ev) {
				if (isFunction(ev[tp])) isListener ? t.removeEventListener(tp, ev[tp] || noop) : t.dettachEvent('on' + tp, ev[tp] || noop);
			}
		}

		// t && tp && isFunction(ev) && (t.removeEventListener ?
		// 	t.removeEventListener(tp, ev || noop) :
		// 	t.dettachEvent('on' + tp, ev || noop)
		// )
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
		proto: proto,
		noop: noop
	};
}();

//export default util;

},{"./lang":3}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Version = exports.Version = '0.4.0';

},{}]},{},[6])(6)
});
