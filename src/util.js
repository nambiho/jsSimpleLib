"use strict";

const util = function (sl) {

	const 
	toString = Object.prototype.toString,
	jsonctor = JSON.constructor,
	noop = function () {};

	// is Functions
	const
	isArray = (x) => {
		return Array.isArray(x) //(toString.call(x) === "[object Array]")
	},

	isObject = (x) => {
		if (!x) return false;
		if (!x.constructor) return false;
		return (!x.constructor.name) ? toString.call(x) === '[object Object]' : x.constructor.name === 'Object'
	},

	isNative = (x) => {
		return x.indexOf("[native code]") > -1
	},

	isFunction = (x) => {
		return typeof x === "function"
	},

	isString = (x) => {
		return typeof x === "string"
	},

	isNull = (x) => {
		return (toString.call(x) === "[object Null]")
	},

	isUndefined = (x) => {
		return (typeof x === "undefined")
	},

	isFalse = (x) => {
		return (isNull(x) || isUndefined(x) || (x === "") || (x === 0) || !x)
	},

	isJSON = (x) => {
		return !!x && (x.constructor === jsonctor)
	},

	isJsonString = (x) => {
		try {return JSON.parse(x) && !!x} catch(e) {return false}
	},

	isDom = (x) => {
		return x && !!x.nodeName
	},

	isPlain = (x) => {
		if (isFalse(x) || !isObject(x)) return false;
		let p=Object.getPrototypeOf(x);
		if (!p) return isJSON(x);
		let ctor=Object.hasOwnProperty.call(p, "constructor") && p.constructor;
		return isFunction(ctor) && isNative(ctor.toLocaleString())
	},

	dateFormat = function _dateFormat(agDate, fmt, bHour12, option) {
		if (isFalse(agDate)) return "";
		let typeof_date = toString.call(agDate);
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
		hour12 = (h > 12 ? Math.ceil(h / 12) : h),
		ampm = (h > 12 ? "PM" : "AM");

		return fmt.replace(/(yyyy|yy|mm|dd|m|d|hh|nn|ss|h|n|s|w|z)/gi, function(_1) {
			switch (_1) {
				case "yyyy": return y;
				case "yy": return ("" + y).substr(-2);
				case "mm": return ("0" + m).substr(-2);
				case "dd": return ("0" + d).substr(-2);
				case "m": return m;
				case "d": return dt;
				case "hh": return (bHour12?ampm + " ":"") + ("0" + (bHour12?hour12:hour24)).substr(-2);
				case "nn": return ("0" + n).substr(-2);
				case "ss": return ("0" + s).substr(-2);
				case "h": return h;
				case "n": return n;
				case "ss": return ("0" + s).substr(-2);
				case "s": return s;
				case "w": return sl.lang((option&&option.langcode)||'').date.week[d];
				case "z": return (zone>0?"+":"-")+zone;
			}
		});
	}
	;

	// regexp Functions
	const
	trim = (x) => {
		return x.replace(/^[\s]+|[\s]+$/g,"")
	},

	strPattern = function (d,c) {
		// d = json to be replace
		// {'test' : 'replace test'}
		// c = string to be changed
		// '{{@test}}'
		if (isString(d)) {c=d; d=this||{}}
		let a = /{{@([a-zA-Z0-9_@\. \*\^\$\#-]*)}}/g;
		return c.replace(a,(e,f) => {
			return isNull(d[f]) || isUndefined(d[f]) ? "" : d[f]
		});
	}
	;

	// DOM Functions : a few
	const
	getbyId = function (s) {
		return ((this && this.getElementById) ? this : document).getElementById(s)
	},

	getbyClassName = function (s) {
		return Array.prototype.slice.call(
			((this && this.getElementsByClassName) ? this : document).getElementsByClassName(s)
		)
		// no support : ie
		//return Array.from(((this && this.getElementsByClassName) ? this : document).getElementsByClassName(s))
	},

	getbyTagName = function (s) {
		return Array.prototype.slice.call(
			((this && this.getElementsByTagName) ? this : document).getElementsByTagName(s)
		)
		// no support : ie
		//return Array.from(((this && this.getElementsByTagName) ? this : document).getElementsByTagName(s))
	},
	
	getbyName = function (s) {
		return Array.prototype.slice.call(
			((this && this.getElementsByName) ? this : document).getElementsByName(s)
		)
		// no support : ie
		//return Array.from(((this && this.getElementsByName) ? this : document).getElementsByName(s))
	},

	query = function (s) {
		let _ret = ((this && this.querySelector) ? this : document).querySelector(s);
		return _ret
	},

	queryall = function (s) {
		let m = ((this && this.querySelectorAll) ? this : document).querySelectorAll(s);
		return isArray(m) ? m : Array.prototype.slice.call(m) //m.forEach
		// no support : ie
		//return Array.from(((this && this.querySelectorAll) ? this : document).querySelectorAll(s));
	},

	style = (el,stl) => {
		if (!isObject(stl)) return el;
		for(let x in stl) {
			el.style[x] = stl[x]
		}
	},

	createElement = (info,obj) => {
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
		for(let attr in info.attr) {
			el.setAttribute(attr,info.attr[attr])
		}
		style(el, info.style);
		// for(let ev in info.event){
		// 	isFunction(info.event[ev]) && addEvent(el, ev, info.event[ev])
		// }

		addEvent(el, (function (event) {
			let ret = {};
			for (let ev in event) {
				isFunction(event[ev]) && (ret[ev] = event[ev])
			}
			return ret
		} (info.event)));

		info.child ? el.appendChild(info.child) : 
			info.html ? el.innerHTML = info.html : 
				info.text && ((el.textContent = info.text))
		info.parent && info.parent.appendChild(el);
		return el
	},

	getComputedStyle = function setElemMargin (elem, stylename) {
		if (!elem) return;
		let style = window.getComputedStyle(elem);
		if (!style) return;
		return !stylename ? style : style[stylename]
	},

	addEvent = (t,/*tp,*/ev,c) => {
		let isListener = !!t.addEventListener;
		if (t && ev) {
			for (let tp in ev) {
				if (isFunction (ev[tp]))
					isListener ? 
						t.addEventListener(tp, ev[tp] || noop, c || false) :
						t.attachEvent('on' + tp, ev[tp] || noop)
			}
		}
		// t && tp && isFunction(ev) && (t.addEventListener ?
		// 	t.addEventListener(tp, ev || noop, c || false) :
		// 	t.attachEvent('on' + tp, ev || noop)
		// )
	},

	removeEvent = (t,/*tp,*/ev) => {
		let isListener = !!t.removeEventListener;
		if (t && ev) {
			for (let tp in ev) {
				if (isFunction (ev[tp]))
					isListener ? 
						t.removeEventListener(tp, ev[tp] || noop) :
						t.dettachEvent('on' + tp, ev[tp] || noop)
			}
		}

		// t && tp && isFunction(ev) && (t.removeEventListener ?
		// 	t.removeEventListener(tp, ev || noop) :
		// 	t.dettachEvent('on' + tp, ev || noop)
		// )
	},

	trigger = function _trigger (_obj,_eventtype) {
		const _browserEvent = () => {
			let ev;
			if(typeof(Event) === 'function') {
				ev = new Event(_eventtype,{
					bubbles : true,
					cancelBubble : true,
					cancelable : true
				});
			} else {
				ev = document.createEvent('Event');
				event.initEvent(_eventtype,true,true)
			}
			return ev
		};

		if (_obj.dispatchEvent) _obj.dispatchEvent(_browserEvent())
		else _obj.fireEvent('on' + _eventtype)
	}
	;

	// object Functions
	const
	copy = (target,source,delPrefix=false) => {
		if (!source) return target;
		let rtype = isArray(source) ? [] : {},
		result = isObject(target) ? target : rtype,
		keys = Object.keys(source), key = '';
		for (let i = 0 ; i < keys.length ; i++) {
			key = keys[i];
			if (delPrefix || key.substr(0, delPrefix.length) === delPrefix) continue;
			let val = source[key], x = isArray(val) ? [] : isPlain(val) ? {} : false;
			result[key] = x ? copy(x, val, delPrefix) : val;
		}
		return result
	},

	merge = (target, ...source) => {
		let result = target;
		source.forEach((el, idx) => {
			!isFalse(source) && (result = copy(result,el))
		})
		return result || {}
	},

	delPrefixMerge = (target, delPrefix, ...source) => {
		let result = target;
		source.forEach((el, idx) => {
			!isFalse(source) && (result = copy(result,el,delPrefix))
		})
		return result || {}
	},

	object = (o,descriptor,extend) => {
		return Object.create(merge({},0x5f,o,extend),descriptor)
	},

	proto = (obj, type, entry) => {
		return obj && (
			obj.prototype ? (obj.prototype[type] = entry) : (obj[type] = entry)),
			obj;
	}
	;
	
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
		dateFormat:dateFormat,
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
	}
};

export default util;