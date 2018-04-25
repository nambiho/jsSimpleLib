
"use strict";

export default function runtask (taskInfo) {
	/*
	taskInfo = {
		async: true/false
		func: function
		object: thisArg
		argv: arguments
	}
	*/

	let QUEUE = [], doneQUEUE = [], Super=this;
	const getTasks = (tasks) => {
		let tmp = [];
		if (Super.util.isArray(tasks)) {
			tmp = tmp.concat(tasks)
		} else if (Super.util.isJSON(tasks)) {
			tmp = tmp.concat([tasks])
		} else if (Super.util.isFunction(tasks)) {
			tmp = [{func: tasks}]
		}
		tmp = tmp.filter(function (entry) {
			return ('func' in entry)
		});
		return tmp;
	};
	const apply = function (func, object, argv) {
		return function () {func.apply(object, Super.util.isArray(argv)?argv:[argv])}
	};
	const object = Super.util.object({
		add : function (tasks) {
			let tmp = getTasks(tasks);
			QUEUE = QUEUE.concat(tmp);
			return this
		},
		run : function (tasks) {
			tasks && this.add(tasks)
			let proc, argv;

			while (1) {
				if (QUEUE.length === 0) break;
				proc = QUEUE.splice(0,1)[0],
				argv = (Super.util.isArray(proc.argv) ? proc.argv : [proc.argv]);
				if (Super.util.isFunction(proc.func)) {
					(proc.async) ?
					setTimeout(apply(proc.func, proc.object||null, argv), 40) :
					apply(proc.func, proc.object||null, argv)()
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
