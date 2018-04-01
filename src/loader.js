'use strict';

import {default as util} from './utillity.js';

export const loader = function _script_loader(){
	function location_src(src){return src}
	function load_script(src){
		var _append = document.head;
		_append.appendChild((function(){
			var _script_elem = document.createElement("script");
			_script_elem.onload = _script_elem.onreadystatechange = noop;
			_script_elem.src = location_src(src);
			return _script_elem
		})())
	}
	for(var i = 0; i < arguments.length; i++){
		load_script(arguments[i])
	}
}