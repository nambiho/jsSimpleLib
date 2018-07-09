const Promise = (function (global, object) {
	
	//return global.Promise||object;
	return object();

})(typeof global != 'undefined' ? global : this||window, function () {
	'use strict';

	var result = true;

	function Defer (promise) {
		this.promise = promise;
		this.result = result;
	}

	function Promise (executor) {
		var def = new Defer(this);

		PromiseInit.call (this, def);
		executor (
			function () {
				result = true
			},
			function () {
				result = false
			}
		)
	}

	function PromiseInit (def) {
		this.then = function (resolve, reject) {
			if (result) {
				if (resolve) {
					resolve();
					result = true;
				}
			} else {
				if (reject) {
					reject();
					result = true;
				}
			}

			var r = new this.constructor(function (res, rej) {
				
			});
			return r;
		}

		this.catch = function (reject) {
			return this.then(null, reject);
		}
	}

	return Promise;
});

export default Promise;
