'use strict';

export const loader = function (...argv){
	/**
	 * Worker does not support.
	 * The only parent element is document.head.
	 * 
	 * arg = [], ..., function
	 */

	
	let train = Array();
	argv.forEach((entry, idx) => {
		if (this.util.isArray(entry)) {
			train=train.concat(entry)
		} else train.push(entry)
	});
	const location_src = (src,cache) => {
		let returnVal = src, d=/\?/.test(src);
		returnVal += (cache? (d?'&':'?') + 't='+this.util.dateFormat(new Date(), 'yyyymmddss'):'');
		return returnVal
	};
	const onload = (e) => {}
	const load = (src) => {
		if (!src) return;
		const script = this.util.createElement({
			dom:"script",
			attr:{
				src:location_src(src,true),
				charset:'utf-8',
				type:'text/javascript'
			},
			event:{
				error:function (e) {
					throw new Error(src + ' : script loading error')
				}
			},
			parent:document.head
		})
	};

	train.forEach((entry, idx) => {
		if (!entry) return false
		if (this.util.isFunction(entry)) return false
		load(entry)
	});
}
