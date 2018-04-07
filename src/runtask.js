'use strict';

export const runtask = function(taskInfo) {
	/*
	taskInfo = {
		async: true/false
		func: function
		object: thisArg
		argv: arguments
	}
	*/

	let QUEUE = [], doneQUEUE = [];

	const THIS=this/*simplelib*/;
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
				doneQUEUE.push(proc);
			}
			return this
		}
	});
	Object.defineProperty(object, 'queue', {
		set : function (tasks) {
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
