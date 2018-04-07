'use strict';

function utillity () {
	
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

	dateFormat = function _dateFormat(agDate, fmt, bHour12) {
		let typeof_date = toString.call(agDate),
		THIS;

		if (typeof_date === "[object String]") {
			if (toString.call(this) === "[object Date]"){
				THIS = this;
				bHour12 = fmt;
				fmt = agDate;
			} else {
				return agDate;
			}
		} else if (typeof_date === "[object Date]") {
			THIS = agDate;
		} else return "";
		
		if (isFalse(THIS)) return "";
		var y = THIS.getFullYear(),
		m = THIS.getMonth() + 1,
		dt = THIS.getDate(),
		d = THIS.getDay(),
		h = THIS.getHours(),
		n = THIS.getMinutes(),
		s = THIS.getSeconds(),
		zone = -(THIS.getTimezoneOffset() / 60),
		hour24 = h,
		hour12 = (h > 12 ? Math.ceil(h / 12) : h),
		ampm = (h > 12 ? "PM" : "AM");

		return fmt.replace(/(yyyy|yy|mm|dd|m|d|hh|nn|ss|h|n|s|w|z)/gi, function(_1) {
			switch (_1) {
				case "yyyy": return y; break;
				case "yy": return ("" + y).substr(-2); break;
				case "mm": return ("0" + m).substr(-2); break;
				case "dd": return ("0" + d).substr(-2); break;
				case "m": return m; break;
				case "d": return dt; break;
				case "hh": return (bHour12?ampm + " ":"") + ("0" + (bHour12?hour12:hour24)).substr(-2); break;
				case "nn": return ("0" + n).substr(-2); break;
				case "ss": return ("0" + s).substr(-2); break;
				case "h": return h; break;
				case "n": return n; break;
				case "ss": return ("0" + s).substr(-2); break;
				case "s": return s; break;
				case "w": return lang.date.week[d]; break;
				case "z": return (zone>0?"+":"-")+zone; break;
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
		// return Array.prototype.slice.call(
		// 	((this && this.getElementsByClassName) ? this : document).getElementsByClassName(s)
		// )
		return Array.from(((this && this.getElementsByClassName) ? this : document).getElementsByClassName(s))
	},

	getbyTagName = function (s) {
		// return Array.prototype.slice.call(
		// 	((this && this.getElementsByTagName) ? this : document).getElementsByTagName(s)
		// )
		return Array.from(((this && this.getElementsByTagName) ? this : document).getElementsByTagName(s))
	},
	
	getbyName = function (s) {
		// return Array.prototype.slice.call(
		// 	((this && this.getElementsByName) ? this : document).getElementsByName(s)
		// )
		return Array.from(((this && this.getElementsByName) ? this : document).getElementsByName(s))
	},

	query = function (s) {
		let _ret = ((this && this.querySelector) ? this : document).querySelector(s);
		return _ret
	},

	queryall = function (s) {
		// let m = ((this && this.querySelectorAll) ? this : document).querySelectorAll(s);
		// return m.forEach ? m : Array.prototype.slice.call(m)
		return Array.from(((this && this.querySelectorAll) ? this : document).querySelectorAll(s));
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
		for(let ev in info.event){
			isFunction(info.event[ev]) && addEvent(el, ev, info.event[ev])
		}
		info.child ? el.appendChild(info.child) : 
			info.html ? el.innerHTML = info.html : 
				info.text && ((el.textContent = info.text))
		info.parent && info.parent.appendChild(el);
		return el
	},

	addEvent = (t,tp,ev,c) => {
		t && tp && isFunction(ev) && (t.addEventListener
			? t.addEventListener(tp, ev || noop, c || false)
			: t.attachEvent('on' + tp, ev || noop)
		)
	},

	removeEvent = (t,tp,ev) => {
		t && tp && isFunction(ev) && (t.removeEventListener
			? t.removeEventListener(tp, ev || noop)
			: t.dettachEvent('on' + tp, ev || noop)
		)
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
		const rtype = isArray(source) ? [] : {};
		let result = isObject(target) ? target : rtype;
		for (let x in source) {
			if (!delPrefix || x.substr(0,delPrefix.length) !== delPrefix) {
				result[x] = (isArray(source[x])
					? copy(result[x] || [], source[x], delPrefix)
					: isPlain(source[x])
						? copy(result[x] || {}, source[x], delPrefix)
						: source[x])
			}
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
		addEvent: addEvent,
		removeEvent: removeEvent,
		copy: copy,
		merge: merge,
		delPrefixMerge: delPrefixMerge,
		object: object,
		noop: noop
	}
}

export default utillity();