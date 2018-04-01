'use strict';

import {default as util} from './utillity.js';

export const Runtask = function(_t) {
	/*
	{
		async:true/false
		func:function
		object: thisArg
		argv:function argument array
	}
	*/


	const prms = new Promise(function (resolve, reject) {

	});


	var _this,__queue;
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
				isFunction(__f) && 
				(__s 
					? setTimeout(function(){__f.apply(__o || _this, __a)},0)
					: __f.apply(__o || _this, __a)
				)
			})
		}
	}
}