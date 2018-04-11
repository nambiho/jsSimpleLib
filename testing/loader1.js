function loader1 () {
	var sl = new simplelib();
	var loader_method = sl.util.getbyId('loader_method');
	var loader1_text = 'simplelib.loader(\'loader1.js\')';
	
	var interval = 60, prev;
	loader1_text.split('').forEach(function(val, idx){
		var tm = setTimeout(function () {
			loader_method.textContent += val;
			clearTimeout(tm)
		}, (sl.util.isFalse(prev) ? 0 : 60) * idx);
		prev = val
	});
}
loader1()