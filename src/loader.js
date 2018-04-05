'use strict';

export const loader = function (...argv){
	let train = Array();

	const location_src = (src) => {return src};
	const onload = (id) => {}
	const load = (src) => {
		if (!src) return;
		const head = document.head;
		const script = this.util.createElement({
			dom:"script",
			attr:{
				src:src
			},
			event:{
				//load:function () {abc()},
				error:function () {
					throw new Error(src + ' : script loading error')
				}
			}
		});
		head.appendChild(script);
	};

	load('/public/test2.js');
	
	return;
	for(var i = 0; i < arguments.length; i++){
		load_script(arguments[i])
	}
}