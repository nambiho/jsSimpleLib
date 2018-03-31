
import Version from './version';
import {bInfo} from './navigator';
import {default as util} from './utillity.js';

export default class simplelib {
	constructor (opt) {
		//console.log(bInfo)
		this.bInfo = bInfo();
		this.version = Version;
		this.option = opt
	}
}

simplelib.prototype.util = util();
