"use strict";

import {Version} from './version';
import {bInfo} from './binfo';
import {default as util, set} from './util';
import runtask from './runtask';
import loader from './loader';
import lang from "./lang";
import ajax from "./ajax";


const locale = {
	date: {
		week: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
	}
};

class simplelib {
	constructor(opt) {
		opt.locale = util.merge(opt.locale||{}, locale);
		this.option = util.merge({}, opt);
		this.util = set(this);
		this.bInfo = bInfo;
		this.version = Version;
		this.lang = lang;
	}
}

util.proto(simplelib, {
	ajax: ajax,
	runtask: runtask,
	loader: loader
});

export default simplelib;
if (module) module.exports = simplelib;