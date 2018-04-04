'use strict';

export const Runtask = function(taskInfo) {
	/*
	taskInfo = {
		async:true/false
		func:function
		object: thisArg
		argv:function argument array
	}
	*/

	const THIS=this/*simplelib*/;

	let QUEUE = [], oldQUEUE = [];

	const getTasks = (tasks) => {
		let tmp = [];
		if (THIS.util.isArray(tasks)) {
			tmp = tmp.concat(tasks)
		} else if (THIS.util.isJSON(tasks)) {
			tmp = tmp.concat([tasks])
		}
		tmp = tmp.filter(function (entry) {
			return ('func' in entry)
		});
		return tmp;
	};

	const object = THIS.util.object({
		add : function (tasks) {
			let tmp = getTasks(tasks);
			QUEUE = QUEUE.concat(tmp);
			return this
		},
		run : function (tasks) {
			tasks && this.add(tasks);
			let proc, async, func, object, argv;

			while (1) {
				if (QUEUE.length === 0) break;
				proc = QUEUE.splice(0,1)[0],
				async = proc.async,
				func = proc.func,
				object = proc.object||null,
				argv = (THIS.util.isArray(proc.argv) ? proc.argv : [proc.argv]);
				if (THIS.util.isFunction(func)) {
					(async)
					? setTimeout(function(){func.apply(object, argv)}, 0)
					: func.apply(object, argv)
				}
			}
			return this
		}
	});
	Object.defineProperty(object, 'queue', {
		set : function (tasks) {
			// set 함수에서 직접 변수를 변경 해야 한다.
			// 다른 함수를 호출 하여 다른 함수에서 변수를 변경 하게 되면 재사용이 안됨
			QUEUE = getTasks(tasks)
		},
		get : function () {
			return QUEUE
		}
	});
	Object.freeze(object);

	object.queue = taskInfo;
	return object
}
