import {Version} from './version';
import {bInfo} from './binfo';
import {default as util, set} from './util';
import runtask from './runtask';
import loader from './loader';
import Promise from './slPromise';
import {default as ajax, get, post} from "./ajax";

const locale = {
	date: {
		week: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
	}
};

class simplelib {
	constructor(opt={}) {
		opt.locale = util.merge(opt.locale||{}, locale);
		this.option = util.merge({}, opt);
		this.util = set(this);
		this.bInfo = bInfo;
		this.version = Version;
	}
}

util.proto(simplelib, {
	ajax: ajax,
	runtask: runtask,
	loader: loader,
	Promise: Promise,
	get: get,
	post: post
});

export default simplelib;
if (module) module.exports = simplelib;