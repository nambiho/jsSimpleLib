'use strict';

export const loader = function (...argv){
	/*
	arg = [], ..., function
	*/

	let train = Array();
	argv.forEach((entry, idx) => {
		if (this.util.isArray(entry)) {
			train=train.concat(entry)
		} else train.push(entry)
	});

	//let idx = 0;
	const promise = new Promise((resolve, reject) => {});
	const location_src = (src) => {return src};
	const onload = (id) => {}
	const load = (src) => {
		if (!src) return;
		const head = document.head;
		const script = this.util.createElement({
			dom:"script",
			attr:{
				src:location_src(src)
			},
			event:{
				error:function () {
					throw new Error(src + ' : script loading error')
				}
			}
		});
		head.appendChild(script);
	};

	train.forEach((entry, idx) => {
		if (!entry) return false
		if (this.util.isFunction(entry)) return false
		load(entry)
	});
}