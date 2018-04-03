
import {Version} from './version';
import {bInfo} from './navigator';
import util from './utillity.js';
import {Runtask} from './task.js';
import {loader} from './loader.js';

export default class simplelib {
	constructor (opt) {
		//console.log(bInfo)
		this.bInfo = bInfo();
		this.version = Version;
		this.option = opt;
		this.runtask = Runtask;
		this.loader = loader
	}
}

simplelib.prototype.util = util;
simplelib.prototype.runTask = Runtask;

