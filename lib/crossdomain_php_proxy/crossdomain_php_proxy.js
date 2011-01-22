var crossdomain = {}

crossdomain.request = function(spec){
	
	var proxy = {};
	proxy.url = spec.url;
	proxy.data =spec.data;
	
	//proxy = JSON.stringify(proxy);
	var proxy_url = document.location.pathname+"lib/crossdomain_php_proxy/crossdomain_php_proxy.php";
	var data = {
		"proxy":proxy,
	}
	$.ajax({
		url:proxy_url,
		type : spec.method,
		data:data,
		success : spec.success
	});
	
};