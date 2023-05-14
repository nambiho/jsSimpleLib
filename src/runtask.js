export default function runtask (options) {
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

	let Super=this;
	function _convertArray (source) {
		let tmp = [];
		if (Super.util.isArray(source)) {
			tmp = tmp.concat(source)
		} else if (Super.util.isJSON(source)) {
			tmp = tmp.concat([source])
		} else if (Super.util.isFunction(source)) {
			tmp = [{func: source}]
		}
		return tmp;
	}

	class QUEUE {
		constructor (source, filter) {
			this.data = [];
			this.push(source);
			this.filter = filter;
		}
		get length () {return this.data.length}
		get isEmpty () {
			return this.length === 0
		}
		push (source) {
			let tmp = _convertArray(source);
			if (this.filter) tmp = this.filter(tmp)
			this.data = this.data.concat(tmp);
		}
		pop () {
			if (this.length == 0) return;
			return this.data.shift();
		}
	}

	let qu = new QUEUE(options.tasks||[], function (src) {
		return src.filter(function (entry) {
			return ('func' in entry) && Super.util.isFunction(entry.func)
		});
	}),
	tOut, active = false,
	isPromise = window.Promise && Super.util.isNative(Promise),
	promise = isPromise && Super.util.delay(5)
	;
	
	const apply = function (func, object, argv) {
		return () => func.apply(object, Super.util.isArray(argv)?argv:[argv])
	};

	const process = function taskRunProcess() {
		if (qu.isEmpty) {active=false; return}
		var proc, argv;
		while(1) {
			if (!(proc = qu.pop())) {active=false; return}
			if (Super.util.isFunction(proc.func)) {
				argv = (Super.util.isArray(proc.argv) ? proc.argv : [proc.argv]);
				if (isPromise) promise&&promise.then(apply(proc.func, proc.object||null, argv));
				else apply(proc.func, proc.object||null, argv)();
			}
		}
	};

	// nextTick을 보장 할 수 있는 솔루션을 만들어야한다.
	const object = Super.util.object({
		async : (options.async!==false),
		add : function (tasks) {
			qu.push(tasks);
			return this
		},
		run : function (tasks) {
			tasks && qu.push(tasks);
			if (!active) {
				if (this.async) {
					active = true;
					if (isPromise) process();
					else setTimeout(process, 10);
				} else process();
			}
			return this
		}
	});
	
	Object.freeze(object);

	return object
}
