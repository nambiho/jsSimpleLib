'use strict';

export const loader = function (jsURL, fn, option){
	/**
	 * Worker does not support.
	 * The only parent element is document.head.
	 * 
	 * jsURL : url string, Array or String
	 * fn : function
	 * option : TO-DO
	 */

	jsURL = this.util.isArray(jsURL) ? jsURL : Array(jsURL);
	let train = Array(), complete = Array(), next = (this.util.isFunction(fn) && fn) || this.util.noop;

	const location_src = (src,cache) => {
		let returnVal = src, d=/\?/.test(src);
		returnVal += (cache ? '' : (d?'&':'?') + 't='+this.util.dateFormat(new Date(), 'yyyymmddss'));
		return returnVal
	};

	const load = (entry) => {
		if (!entry.url) return;
		this.util.createElement({
			dom:"script",
			attr:{
				src:location_src(entry.url, false),
				charset:'utf-8',
				type:'text/javascript'
			},
			event:{
				load: function (e) {
					entry.complete = true;
				},
				error:function (e) {
					throw new Error(src + ' : script loading error')
				}
			},
			parent:document.head
		})
	};

	jsURL.forEach((url, idx) => {
		complete.push(false);
		train.push(this.util.object({index: idx, url:url}, {
			complete : {
				set : function (val) {
					complete[this.index] = val;
					if (complete.indexOf(false) === -1) {
						next()
					}
				}
			}
		}))
	});

	train.forEach((entry, idx) => {
		load(entry)
	});
}
