;(function (global,simplelib,undefined) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = simplelib :
	typeof define === 'function' && define.amd ? define(simplelib) :
	(global.simplelib = simplelib);
} (
this, 

(function () {
	"use strict";

	var
		version = "0.0.1",

		bInfo = (function () {
			var b = navigator.userAgent.toLowerCase(),
			ie = /msie [6-8]/.test(b),
			ie9 = /msie 9/.test(b),
			ie10 = /msie 10/.test(b),
			ie11 = /(trident\/)(rv:11)/.test(b),
			edge,
			chrome = /nethelper/.test(b) && /chrome\//.test(b),
			opera = !chrome&&/opr\/|opera\//.test(b),
			safari = !opera&&!chrome&&/safari/.test(b),
			firefox = /firefox/.test(b),
			whale = /whale/.test(b)
			;
			return {
				isChrome:chrome,isSafari:safari,isIE11:ie11,isIE10:ie10,isIE9:ie9,
				isOpera:opera,isFirefox:firefox,isWhale:whale,ieMore:ie,ios:/iphone|ipad/.test(b)
			}
		} ()),
	    
		toString = Object.prototype.toString,

		jsonctor = JSON.constructor,

		isObject = function (x) {
			if (!x) return false;
			if (!x.constructor) return false;
			return (!x.constructor.name) ? toString.call(x) === "[object Object]" : x.constructor.name === "Object"
		},

		isNative = function (x) {
			return x.indexOf("[native code]") > -1
		},

		isArray = function(x) {
			return (toString.call(x) === "[object Array]")
		},

		isFunction = function(x) {
			return typeof x === "function"
		},

		isPlain = function (x) {
			if (isFalse(x) || !isObject(x)) return false;
			var p=Object.getPrototypeOf(x);
			if (!p) return isJSON(x);
			var ctor=Object.hasOwnProperty.call(p, "constructor") && p.constructor;
			return isFunction(ctor) && isNative(ctor.toLocaleString())
		},

		isString = function (x) {
			return typeof x === "string"
		},

		isNull = function (x){
			return (toString.call(x) === "[object Null]")
		},

		isUndefined = function (x){
			return (typeof x === "undefined")
		},

		isDom = function (x) {
			return x && !!x.nodeName
		},

		isFalse = function (x){
			return (isNull(x) || isUndefined(x) || (x === "") || (x === 0) || !x)
		},

		isJSON = function (x) {
			return x.constructor === jsonctor
		},

		isJsonString = function (x) {
			try {return JSON.parse(x) && !!x} catch(e) {return false}
		},

		trim = function (x) {
			return x.replace(/^[\s]+|[\s]+$/g,"")
		},

		getbyId = function (s){
			return ((this && this.getElementById) ? this : document).getElementById(s)
		},

		getbyClassName = function (s){
			return Array.prototype.slice.call(
				((this && this.getElementsByClassName) ? this : document).getElementsByClassName(s)
			)
		},

		getbyTagName = function (s){
			return Array.prototype.slice.call(
				((this && this.getElementsByTagName) ? this : document).getElementsByTagName(s)
			)
		},
		
		getbyName = function (s){
			return Array.prototype.slice.call(
				((this && this.getElementsByName) ? this : document).getElementsByName(s)
			)
		},

		query = function (s){
			var _ret = ((this && this.querySelector) ? this : document).querySelector(s);
			return _ret
		},

		queryall = function (s){
			var m = ((this && this.querySelectorAll) ? this : document).querySelectorAll(s);
			return m.forEach ? m : Array.prototype.slice.call(m)
		},

		copy = function (target,source,delPrefix) {
			var rtype = isArray(source) ? [] : {};
			target = isObject(target) ? target : rtype;
			for (var x in source) {
				if (!delPrefix || x.charCodeAt(0) !== delPrefix) {
					target[x] = (isArray(source[x])
						? copy(target[x] || [], source[x], delPrefix)
						: isPlain(source[x])
							? copy(target[x] || {}, source[x], delPrefix)
							: source[x])
				}
			}
			return target
		},

		css = function (el,style) {
			if (!isObject(style)) return el;
			for(var x in style){
				el.style[x] = style[x]
			}
		},

		merge = function (target,delPrefix) {
			var len=arguments.length,
			i=(isObject(delPrefix) ? 1 : 2),
			source;
			for(; i < len ; i++){
				source = arguments[i];
				!isFalse(source) && (target = copy(target,source,delPrefix))
			}
			return target || {}
		},

		createElement = function (info,obj) {
			if (!info.dom) return null;
			var el = document.createElement(info.dom);
			for(var attr in info.attr) {
				el.setAttribute(attr,info.attr[attr])
			}
			css(el, info.style);
			for(var ev in info.event){
				isFunction(info.event[ev]) && addEvent(el, ev, info.event[ev])
			}
			info.child ? el.appendChild(info.child) : 
				info.html ? el.innerHTML = info.html : 
					info.text && ((el.textContent = info.text))
			info.parent && info.parent.appendChild(el);
			return el
		},

		addEvent = function (t,tp,ev,c) {
			t && tp && isFunction(ev) && (t.addEventListener
				? t.addEventListener(tp, ev || noop, c || false)
				:t.attachEvent("on" + tp, ev || noop)
			)
		},

		removeEvent = function (t,tp,ev) {
			t && tp && isFunction(ev) && (t.removeEventListener
				? t.removeEventListener(tp, ev || noop)
				:t.dettachEvent("on" + tp, ev || noop)
			)
		},

		trigger = function _trigger (_obj,_eventtype,_call) {
			if(!isFalse(_call) && !isFalse(_call.before) && isFunction(_call.before)) _call.before.call(_obj,_eventtype);
			
			function _browserEvent () {
				if(typeof(Event) === 'function') {
					var event = new Event(_eventtype,{
						bubbles : true,
						cancelBubble : true,
						cancelable : true
					});
				} else {
					var event = document.createEvent('Event');
					event.initEvent(_eventtype,true,true)
				}
				return event
			}

			if (_obj.dispatchEvent) _obj.dispatchEvent(_browserEvent())
			else _obj.fireEvent("on" + _eventtype)

			var _ret;
			if (!isFalse(_call) && !isFalse(_call.end) && isFunction(_call.end)) _ret=_call.end.call(_obj,_eventtype);
			if (!isFalse(_ret)) return _ret
		},

		getUrl = function (u,p) {
			var host = location.host,
			slash = "\u002F",
			dot = "\u002E",
			protocal = location.protocol + slash + slash,
			isSlash = (u.charAt(0) === slash)
			;
			return u + (function () {
				var ret=[];
				for(var x in p)
					ret[ret.length] = (x + "\u003D" + encodeURIComponent(p[x]));
				return (ret.length>0) ? "\u0026" + ret.join("\u0026") : ""
			}())
		},

		object = function (o,descriptor,extend) {
			return Object.create(merge({},0x5f,o,extend),descriptor)
		},

		noop = function () {},

		strPattern = function _RX(d,c){
			var _this=this;
			if (isString(d)) {c=d; d=this||{}}
			var a=/\{\{@([a-zA-Z0-9_@\. \*\^\$\#-]*)\}\}/g,
			b=c.replace(a,function(e,f){return _this.isNull(d[f])||_this.isUndefined(d[f])?"":d[f]});
			return b
		},

		Runtask = function(_t) {
			var _this,
			__queue;
			/*
			{
				async:
				func:
				object:
				argv:
			}
			*/
			return _this = this,
			__queue=_t || [],
			{
				add : function (_) {
					if (!isArray(_)) return;
					var _e=_.every(function (_1,_2) {
						return ("func" in _1)
					});
					_e&&(__queue=__queue.concat(_))
				},
				run : function(){
					__queue.forEach(function (_) {
						var __s = _.async,
						__f = _.func,
						__o = _.object||null,
						__a = (isArray(_.argv) ? _.argv : [_.argv]);
						isFunction(__f) && (__s ? setTimeout(function(){
							__f.apply(__o || _this, __a)
						},0) : __f.apply(__o || _this, __a))
					})
				}
			}
		},
	
		loader = function _script_loader(){
			function location_src(src){return src}
			function load_script(src){
				var _append = document.head;
				_append.appendChild((function(){
					var _script_elem = document.createElement("script");
					_script_elem.onload = _script_elem.onreadystatechange = noop;
					_script_elem.src = location_src(src);
					return _script_elem
				})())
			}
			for(var i = 0; i < arguments.length; i++){
				load_script(arguments[i])
			}
		}
	;	


	var task = new Runtask();
	var util = {
		isObject : isObject,
		isNative : isNative,
		isArray : isArray,
		isFunction  : isFunction,
		isPlain : isPlain,
		isString : isString,
		isNull : isNull,
		isUndefined : isUndefined,
		isDom : isDom,
		isFalse : isFalse,
		isJSON : isJSON,
		isJsonString : isJsonString,
		trim : trim,
		getbyId : getbyId,
		getbyClassName : getbyClassName,
		getbyTagName : getbyTagName,
		getbyName : getbyName,
		query : query,
		queryall : queryall,
		copy : copy,
		css : css,
		merge : merge,
		createElement : createElement,
		addEvent : addEvent,
		removeEvent:removeEvent,
		trigger : trigger,
		getUrl : getUrl,
		object : object,
		noop : noop,
		strPattern : strPattern
	};

	function simplelib (options) {
		if (this === undefined) return null;
		this.init(options);
	}
	
	simplelib.prototype = {
		version : version,
		constructor : simplelib,
		options : null,
		noop : noop,
		bInfo : bInfo,
		task : task,
		loader : loader,
		util : util,
		init : function (options) {
			this.options = options;
		}
	};
	return simplelib
} (this))
));
