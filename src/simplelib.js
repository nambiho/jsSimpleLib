import Version from '../lib/version';
import {bInfo} from '../lib/navigator';
import {default as util} from '../lib/utillity.js';

export default class simplelib {
	constructor (opt) {
		//console.log(bInfo)
		this.bInfo = bInfo();
		this.version = Version;
		this.option = opt
	}
}

simplelib.prototype.util = util();
