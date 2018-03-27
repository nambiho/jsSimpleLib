//mac
//chrome : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
//safari : Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0.3 Safari/604.5.6


//win
//chrome : "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36"
export function bInfo () {
	console.log(navigator)
	var b = navigator.userAgent.toLowerCase();
	debugger;
	var 
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
}