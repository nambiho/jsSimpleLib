"use strict";

export const bInfo = (function (nav) {
	var b = nav.userAgent.toLowerCase(),
	ie = /msie [6-8]/.test(b),
	ie9 = /msie 9/.test(b),
	ie10 = /msie 10/.test(b),
	ie11 = /(trident\/)(rv:11)/.test(b),
	edge,
	chrome = /chrome\//.test(b) && /safari\//.test(b),
	opera = !chrome&&/opr\/|opera\//.test(b),
	safari = !opera&&!chrome&&/safari/.test(b),
	firefox = /firefox/.test(b),
	whale = /whale/.test(b)
	;
	return {
		isChrome:chrome,isSafari:safari,isIE11:ie11,isIE10:ie10,isIE9:ie9,
		isOpera:opera,isFirefox:firefox,isWhale:whale,ieMore:ie,ios:/iphone|ipad/.test(b)
	}
}(navigator))