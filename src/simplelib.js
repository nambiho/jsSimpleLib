'use strict';

import {Version} from './version';
import {bInfo} from './browserinfo';
import util from './utillity';
import {runtask} from './runtask';
import {loader} from './loader';

(this||window)['simplelib'] = class simplelib {
	constructor (opt) {
		this.bInfo = bInfo();
		this.version = Version;
		this.option = opt;
		this.util = util;
	}
}
simplelib.prototype.loader = loader;
simplelib.prototype.runtask = runtask;

