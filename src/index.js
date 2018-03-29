'use strict';

import simplelib from './simplelib';


window.addEventListener('DOMContentLoaded', function (ev) {
	var sl = new simplelib({});

	console.log(sl.util.delPrefixMerge({a:'1'}, 'aaa', {'_b':'2'}));

	//sl.util.merge()
});