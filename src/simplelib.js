"use strict";

import {Version} from './version';
import {bInfo} from './binfo';
import {util} from './util';
import runtask from './runtask';
import loader from './loader';
import lang from "./lang";
import ajax from "./ajax";

//const _util = util();
class simplelib {
	constructor(opt) {
		this.option = util.merge({}, opt);
		this.util = util;
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