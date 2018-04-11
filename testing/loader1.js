function loader1 () {
	var sl = new simplelib();
	var simpletest2 = sl.util.getbyId('simpletest2');
	var loader1_text = 'loader1 text';
	
	var interval = 60, prev;
	loader1_text.split('').forEach(function(val, idx){
		var tm = setTimeout(function () {
			simpletest2.textContent += val;
			clearTimeout(tm)
		}, (sl.util.isFalse(prev) ? 0 : 60) * idx);
		prev = val
	});
}
loader1()