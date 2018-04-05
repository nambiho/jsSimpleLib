'use strict';

import {Version} from './version';
import {bInfo} from './binfo';
import util from './utillity';
import {runtask} from './runtask';
import {loader} from './loader';

class simplelib {
	constructor (opt) {
		this.bInfo = bInfo();
		this.version = Version;
		this.option = opt;
		this.util = util;
	}
}
simplelib.prototype.loader = loader;
simplelib.prototype.runtask = runtask;

(this||window)['simplelib'] = simplelib;