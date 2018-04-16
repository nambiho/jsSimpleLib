"use strict";

import {Version} from './version';
import {bInfo} from './binfo';
import util from './util';
import runtask from './runtask';
import loader from './loader';
import lang from "./lang";

class simplelib {
	constructor (opt) {
		this.util = util(this);
		this.option = this.util.merge({langcd:'en'}, opt);
		this.bInfo = bInfo();
		this.version = Version;
		this.lang = lang;
	}
}
simplelib.prototype.loader = loader;
simplelib.prototype.runtask = runtask(simplelib);

window.simplelib || (window.simplelib = simplelib)