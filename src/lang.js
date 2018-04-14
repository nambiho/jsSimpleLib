"use strict";

export default function lang (code = this.option.langcode) {	
	/**
	 * DATE
	 */
	let date = {};
	if (code==='kr') {
		date.week = ['일','월','화','수','목','금','토'];
	} else if (code==='en') {
		date.week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	} else {
		date.week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	}

	return {
		date:date
	}
}