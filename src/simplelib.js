import {bInfo} from '../lib/navigator';


class Simplelib {
	constructor (opt) {
		//console.log(bInfo)
		this.bInfo = bInfo
	}
}

export default function simplelib (opt) {
	return new Simplelib(opt)
}