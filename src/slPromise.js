const Promise = (function (global, factory) {
	
	//return global.Promise||factory();
	return factory();

})(typeof global != 'undefined' ? global : this||window, function () {
	'use strict';

	//*
	function getArguments (arg) { return Array.prototype.slice.call(arg) }

	function promiseCallBackFunction () {
		// parent defer
		var that = this;
		return function (onResolve, onReject) {
			if (status === 0) {
				try{
					onResolve(null);
				} catch (e) {
					onReject(null, getArguments(e))
				}
			}
		}
	}

	function rejectHandler (r) { console.error(r); }

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
	function run (defer) {
		if (!active) {
			active = setTimeout(function () {
				var task = defer.status === 1 ? defer.resolve : defer.reject;
				if (task) {
					task.apply(defer, defer.argv);
				} else {

				}
			}, 5);
		}
	}

	var $Promise = function Promise (executor) {
		if (!this || (this.constructor !== Promise)) throw Error('Not a Promise');
		if (typeof executor !== 'function') throw TypeError('Not a Function');

		var defer = new Defer(this);
		
		PromiseInit(this, defer);

		executor(
			function executorResolver () {
				PromiseResolve(defer, getArguments(arguments));
			},
			function executorRejector () {
				PromiseReject(defer, getArguments(arguments));
			});
	}

	function PromiseInit (that, defer) {
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
			return promise
		}
		that.catch = function (onReject) {
			return this.then(undefined, onReject);
		}
	}

	function PromiseResolve (defer, argv) {
		defer.argv = argv;
		defer.status = 1;
	}

	function PromiseReject (defer, argv) {
		defer.argv = argv;
		defer.status = -1;
	}


	function Defer (promise) {
		this.promise = promise;
		this.status = 0;
		this.argv = [];
		this.chain = [];
	}


	// Method
	$Promise.all = function () {}
	$Promise.race = function () {}
	$Promise.resolve = function () {}
	$Promise.reject = function () {}

	return $Promise
	// */
});

export default Promise;
