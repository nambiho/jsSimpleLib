'use strict';

//import util from './utillity.js';

export const Runtask = function(taskInfo) {
	/*
	taskInfo = {
		async:true/false
		func:function
		object: thisArg
		argv:function argument array
	}
	*/
	const promise = new Promise(function (resolve, reject) {}),
	_this = this;

	let queue = [];
	
	if (this.util.isArray(taskInfo)) {
		queue = queue.concat(taskInfo)
	} else if (this.util.isJSON(taskInfo)) {
		queue = queue.concat([taskInfo])
	} else return {run:this.util.noop}


	queue = queue.filter(function (entry) {
		return ('func' in entry)
	});

	return {
		run : function () {
			queue.forEach(function (entry) {
				const async = entry.async,
				func = entry.func,
				object = entry.object||null,
				argv = (_this.util.isArray(entry.argv) ? entry.argv : [entry.argv]);

				if (_this.util.isFunction(func)) {
					if (async)
						setTimeout(function(){func.apply(object || _this, argv)}, 0)
					else
						func.apply(object||_this, argv)
				}
			})
		}
	}
}
