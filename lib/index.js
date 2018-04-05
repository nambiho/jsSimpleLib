'use strict';

import simplelib from './simplelib';


window.addEventListener('DOMContentLoaded', function (ev) {
	var sl = new simplelib({});

	//console.log(sl.util.delPrefixMerge({a:'1'}, 'aaa', {'_b':'2'}));
	//console.log(sl.util.getbyTagName('div'))
	//sl.util.merge()

	/* runtask exam */
	/*
	var tasks = [{
		func : function () {
			var i = 0;
			for (; i < 100 ; i++) {}
			console.log(i);
		},
		async : false
	},{
		func : function () {console.log('sync = true')},
		object : sl
	}];

	
	var runtask = sl.runtask(tasks).add({
		func:sl.util.noop
	}).run({
		func:function(){console.log(99);}
	});

	console.log(runtask);
	console.log(runtask.add({func:sl.util.noop}))
	*/
	
	/* loader exam */
	sl.loader();
	
});